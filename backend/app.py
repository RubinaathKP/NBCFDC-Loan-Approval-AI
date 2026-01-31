from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pandas as pd
import joblib
import numpy as np
from typing import Dict, List, Optional
from msme_api import msme_router
app = FastAPI(
    title="NBCFDC Credit Scoring API",
    description="AI/ML based credit scoring for NBCFDC beneficiaries and MSME loans",
    version="2.0.0"
)
app.include_router(msme_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
try:
    model_pipeline = joblib.load('nbcfdc_model.joblib')
    label_encoder = joblib.load('label_encoder.joblib')
except Exception as e:
    print(f"Warning: Could not load models: {e}")
    model_pipeline = None
    label_encoder = None
OCCUPATIONS = [
    'Daily Wage Worker',
    'Tailor',
    'Street Vendor',
    'Agriculture',
    'Small Retail Shop',
    'Auto Driver',
    'Delivery Worker',
    'Handloom Weaver',
    'Milk Vendor',
    'Garment Manufacturer'
]
OCCUPATION_BASE_INCOME = {
    'Daily Wage Worker': 8000,
    'Tailor': 12000,
    'Street Vendor': 11000,
    'Agriculture': 9500,
    'Small Retail Shop': 18000,
    'Auto Driver': 14000,
    'Delivery Worker': 15000,
    'Handloom Weaver': 13000,
    'Milk Vendor': 12500,
    'Garment Manufacturer': 25000
}
RISK_MATRIX = {
    "Strong (75-100)": {
        "Low Income": "Medium",
        "Medium Income": "Low",
        "High Income": "Low"
    },
    "Moderate (50-74)": {
        "Low Income": "Medium",
        "Medium Income": "Medium",
        "High Income": "Low"
    },
    "New/Weak (<50)": {
        "Low Income": "High",
        "Medium Income": "Medium",
        "High Income": "Medium"
    }
}
class ApplicantData(BaseModel):
    age: int = Field(..., ge=18, le=100, description="Age of applicant")
    area_type: str = Field(..., description="Rural, Semi-Urban, or Urban")
    occupation: str = Field(..., description="Occupation of applicant")
    estimated_monthly_income: Optional[float] = Field(None, gt=0, description="Estimated monthly income (auto-predicted if not provided)")
    asset_score: int = Field(..., ge=0, le=2, description="0=None, 1=Minimal, 2=Significant")
    business_years: int = Field(..., ge=0, description="Years in business")
    residence_years: int = Field(..., ge=0, description="Years in current residence")
    shg_member: int = Field(..., ge=0, le=1, description="SHG membership: 0=No, 1=Yes")
    dependents: int = Field(..., ge=0, description="Number of dependents")
    proposed_emi: float = Field(..., gt=0, description="Proposed EMI amount")
    first_time_borrower: int = Field(..., ge=0, le=1, description="First time: 0=No, 1=Yes")
class PredictionResponse(BaseModel):
    risk_bucket: str
    credit_score: int  
    confidence_scores: Dict[str, float]
    estimated_income: float
    emi_to_income_ratio: float
    repayment_discipline_score: int
    reason_codes: List[str]
    score_category: str  
@app.get("/")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "NBCFDC Credit Scoring API",
        "version": "1.0.0",
        "model_loaded": model_pipeline is not None
    }
@app.get("/occupations")
async def get_occupations():
    """Get list of supported occupations"""
    return {
        "occupations": OCCUPATIONS,
        "count": len(OCCUPATIONS)
    }
@app.get("/risk-matrix")
async def get_risk_matrix():
    """Get risk assessment matrix"""
    return {
        "matrix": RISK_MATRIX,
        "description": "Risk assessment based on repayment discipline and income level"
    }
def estimate_monthly_income(data: ApplicantData) -> float:
    """
    Estimate monthly income using the same logic as training data generation in main.py
    This ensures consistency between training and production predictions.
    """
    base_income = OCCUPATION_BASE_INCOME.get(data.occupation, 12000)
    income = base_income + np.random.randint(0, 5000)
    if data.area_type == 'Urban':
        income *= 1.15
    return round(income)
@app.post("/predict", response_model=PredictionResponse)
async def predict_risk(data: ApplicantData):
    """
    Predict credit risk for an applicant
    Returns risk bucket (Low/Medium/High) with confidence scores and reason codes
    """
    if model_pipeline is None or label_encoder is None:
        raise HTTPException(status_code=503, detail="ML models not loaded")
    try:
        if data.estimated_monthly_income is None:
            estimated_income = estimate_monthly_income(data)
        else:
            estimated_income = data.estimated_monthly_income
        input_dict = data.model_dump()
        input_dict['estimated_monthly_income'] = estimated_income
        input_df = pd.DataFrame([input_dict])
        emi_ratio = input_df['proposed_emi'] / input_df['estimated_monthly_income']
        input_df['emi_to_income_ratio'] = emi_ratio
        emi_ratio_value = float(emi_ratio.iloc[0])
        prediction_encoded = model_pipeline.predict(input_df)
        prediction_label = label_encoder.inverse_transform(prediction_encoded)[0]
        probabilities = model_pipeline.predict_proba(input_df)[0]
        prob_dict = {label: float(prob) for label, prob in zip(label_encoder.classes_, probabilities)}
        emi_override_applied = False
        if emi_ratio_value > 0.65:
            prediction_label = "High"
            prob_dict = {"High": 0.99, "Medium": 0.01, "Low": 0.00}
            emi_override_applied = True
        elif emi_ratio_value > 0.50 and prediction_label == "Low":
            prediction_label = "Medium"
            prob_dict = {"High": 0.30, "Medium": 0.65, "Low": 0.05}
            emi_override_applied = True
        repayment_score = calculate_repayment_score(data)
        reason_codes = generate_reason_codes(data, emi_ratio_value, repayment_score, emi_override_applied)
        credit_score, score_category = calculate_credit_score(
            risk_bucket=prediction_label,
            confidence_scores=prob_dict,
            repayment_score=repayment_score,
            emi_ratio=emi_ratio_value,
            data=data
        )
        return PredictionResponse(
            risk_bucket=prediction_label,
            credit_score=credit_score,
            confidence_scores=prob_dict,
            estimated_income=estimated_income,
            emi_to_income_ratio=emi_ratio_value,
            repayment_discipline_score=repayment_score,
            reason_codes=reason_codes,
            score_category=score_category
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
def calculate_credit_score(
    risk_bucket: str, 
    confidence_scores: Dict[str, float], 
    repayment_score: int, 
    emi_ratio: float, 
    data: ApplicantData
) -> tuple[int, str]:
    """
    Calculate credit score (200-900 range) using hybrid approach:
    1. Base score from risk bucket
    2. Confidence-based positioning within range
    3. Business rule adjustments
    Returns: (credit_score, score_category)
    """
    bucket_ranges = {
        'Low': (700, 900),      
        'Medium': (500, 699),   
        'High': (200, 499)      
    }
    min_score, max_score = bucket_ranges.get(risk_bucket, (400, 600))
    confidence = confidence_scores.get(risk_bucket, 0.5)
    range_size = max_score - min_score
    base_score = min_score + (confidence * range_size)
    adjustments = 0
    if data.shg_member == 1:
        adjustments += 25
    if data.business_years >= 5:
        adjustments += 30
    elif data.business_years >= 2:
        adjustments += 15
    if emi_ratio <= 0.25:
        adjustments += 20   
    elif emi_ratio <= 0.35:
        adjustments += 0    
    elif emi_ratio <= 0.50:
        adjustments -= 40   
    elif emi_ratio <= 0.65:
        adjustments -= 80   
    elif emi_ratio <= 1.0:
        adjustments -= 150  
    else:
        adjustments -= 250 - int((emi_ratio - 1.0) * 100)  
    if data.first_time_borrower == 1:
        adjustments -= 15
    adjustments += int((repayment_score - 50) * 0.5)
    if data.residence_years >= 5:
        adjustments += 10
    if data.asset_score >= 2:
        adjustments += 15
    elif data.asset_score == 1:
        adjustments += 5
    final_score = int(max(200, min(900, base_score + adjustments)))
    if final_score >= 800:
        category = "Excellent"
    elif final_score >= 700:
        category = "Good"
    elif final_score >= 600:
        category = "Fair"
    elif final_score >= 500:
        category = "Below Average"
    else:
        category = "Poor"
    return final_score, category
def calculate_repayment_score(data: ApplicantData) -> int:
    """Calculate repayment discipline score (0-100)"""
    score = 50  
    if data.shg_member == 1:
        score += 15
    if data.business_years >= 5:
        score += 20
    elif data.business_years >= 2:
        score += 10
    if 25 <= data.age <= 50:
        score += 10
    elif 18 <= data.age < 25 or 50 < data.age <= 60:
        score += 5
    if data.dependents <= 3:
        score += 10
    elif data.dependents > 5:
        score -= 5
    if data.first_time_borrower == 1:
        score = min(score, 85)
    if data.residence_years >= 3:
        score += 5
    return max(0, min(100, score))
def generate_reason_codes(data: ApplicantData, emi_ratio: float, repayment_score: int, emi_override_applied: bool = False) -> List[str]:
    """Generate explanation reason codes"""
    reasons = []
    if emi_override_applied:
        if emi_ratio > 0.65:
            reasons.append(f"⚠️ CRITICAL: EMI is {emi_ratio*100:.0f}% of income - loan is unaffordable")
        elif emi_ratio > 0.50:
            reasons.append(f"⚠️ WARNING: EMI is {emi_ratio*100:.0f}% of income - high financial stress risk")
    if data.business_years >= 5:
        reasons.append("Stable business activity with 5+ years experience")
    elif data.business_years >= 2:
        reasons.append("Moderate business experience (2-5 years)")
    else:
        reasons.append("Limited business track record")
    if data.shg_member == 1:
        reasons.append("SHG membership improves trust and repayment discipline")
    else:
        reasons.append("Not part of Self-Help Group")
    if emi_ratio <= 0.25:
        reasons.append("Low EMI burden - comfortable repayment capacity")
    elif emi_ratio <= 0.40:
        reasons.append("Moderate EMI burden - manageable repayment")
    elif emi_ratio <= 0.50:
        reasons.append("Elevated EMI burden - some repayment stress expected")
    elif emi_ratio <= 0.65:
        reasons.append("High EMI burden - significant repayment stress")
    else:
        reasons.append("Extreme EMI burden - very high default probability")
    if repayment_score >= 75:
        reasons.append("Strong repayment discipline indicators")
    elif repayment_score >= 50:
        reasons.append("Moderate repayment discipline")
    else:
        reasons.append("Weak repayment discipline indicators")
    if data.asset_score >= 2:
        reasons.append("Significant asset backing")
    elif data.asset_score == 1:
        reasons.append("Minimal asset backing")
    else:
        reasons.append("No asset backing")
    return reasons[:6]  
if __name__ == "__main__":
    import uvicorn
    print("Starting NBCFDC Credit Scoring API...")
    print("API Documentation: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)