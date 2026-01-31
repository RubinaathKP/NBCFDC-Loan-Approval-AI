from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import pandas as pd
import joblib
import numpy as np
from typing import Dict, List, Optional
msme_router = APIRouter(prefix="/msme", tags=["MSME Loans"])
try:
    msme_model_pipeline = joblib.load('msme_risk_model.joblib')
    msme_label_encoder = joblib.load('risk_label_encoder.joblib')
    print("✅ MSME models loaded successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not load MSME models: {e}")
    msme_model_pipeline = None
    msme_label_encoder = None
ENTERPRISE_CATEGORIES = ['Micro', 'Small', 'Medium']
BUSINESS_TYPES = ['Manufacturing', 'Services', 'Trading']
INDUSTRY_SECTORS = [
    'Textile', 'Food Processing', 'Agriculture', 'IT Services',
    'Auto Components', 'General Manufacturing', 'Retail', 'Hospitality',
    'Healthcare', 'Education Services'
]
MSME_RISK_MATRIX = {
    "Compliant (GST+UDYAM)": {
        "Low EMI Burden (<25%)": "Low",
        "Moderate EMI Burden (25-40%)": "Low",
        "High EMI Burden (>40%)": "Medium"
    },
    "Partially Compliant": {
        "Low EMI Burden (<25%)": "Low",
        "Moderate EMI Burden (25-40%)": "Medium",
        "High EMI Burden (>40%)": "High"
    },
    "Non-Compliant": {
        "Low EMI Burden (<25%)": "Medium",
        "Moderate EMI Burden (25-40%)": "High",
        "High EMI Burden (>40%)": "High"
    }
}
class MSMEApplicantData(BaseModel):
    enterprise_category: str = Field(..., description="Micro, Small, or Medium")
    business_type: str = Field(..., description="Manufacturing, Services, or Trading")
    industry_sector: str = Field(..., description="Industry sector")
    years_in_operation: int = Field(..., ge=0, description="Years in business")
    annual_turnover: float = Field(..., gt=0, description="Annual turnover in INR")
    monthly_revenue: Optional[float] = Field(None, description="Monthly revenue (auto-calculated if not provided)")
    employee_count: int = Field(..., ge=1, description="Number of employees")
    gst_registered: int = Field(..., ge=0, le=1, description="GST registered: 0=No, 1=Yes")
    udyam_registered: int = Field(..., ge=0, le=1, description="UDYAM registered: 0=No, 1=Yes")
    itf_filing_years: int = Field(..., ge=0, description="Years of ITR filed")
    existing_loans: int = Field(..., ge=0, description="Number of existing loans")
    existing_emi: float = Field(0, ge=0, description="Total existing EMI amount")
    bank_account_years: int = Field(..., ge=0, description="Years of bank account history")
    credit_history_length: Optional[int] = Field(None, description="Credit history in months")
    past_defaults: int = Field(0, ge=0, description="Number of past defaults")
    delayed_payments: int = Field(0, ge=0, description="Number of delayed payments in last 12 months")
    land_owned: int = Field(0, ge=0, le=1, description="Land/property owned: 0=No, 1=Yes")
    property_value: float = Field(0, ge=0, description="Property value in INR")
    machinery_value: float = Field(0, ge=0, description="Machinery value in INR")
    inventory_value: float = Field(0, ge=0, description="Inventory value in INR")
    loan_amount_requested: float = Field(..., gt=0, description="Loan amount requested in INR")
    loan_tenure_months: int = Field(..., ge=6, le=84, description="Loan tenure in months")
    proposed_emi: Optional[float] = Field(None, description="Proposed EMI (auto-calculated if not provided)")
class MSMEPredictionResponse(BaseModel):
    risk_bucket: str
    credit_score: int
    confidence_scores: Dict[str, float]
    monthly_revenue: float
    emi_to_revenue_ratio: float
    total_emi_burden: float
    reason_codes: List[str]
    score_category: str
    compliance_status: str
def calculate_emi(principal: float, tenure_months: int, annual_rate: float = 0.12) -> float:
    monthly_rate = annual_rate / 12
    emi = (principal * monthly_rate * ((1 + monthly_rate) ** tenure_months)) / \
          (((1 + monthly_rate) ** tenure_months) - 1)
    return round(emi, 2)
def calculate_msme_credit_score(
    risk_bucket: str,
    confidence_scores: Dict[str, float],
    data: MSMEApplicantData,
    emi_ratio: float
) -> tuple[int, str]:
    bucket_ranges = {
        'Low': (700, 900),
        'Medium': (500, 699),
        'High': (200, 499)
    }
    min_score, max_score = bucket_ranges.get(risk_bucket, (400, 600))
    confidence = confidence_scores.get(risk_bucket, 0.5)
    base_score = min_score + (confidence * (max_score - min_score))
    adjustments = 0
    if data.gst_registered == 1 and data.udyam_registered == 1:
        adjustments += 35
    elif data.gst_registered == 1 or data.udyam_registered == 1:
        adjustments += 15
    if data.years_in_operation >= 7:
        adjustments += 30
    elif data.years_in_operation >= 4:
        adjustments += 20
    elif data.years_in_operation >= 2:
        adjustments += 10
    if data.itf_filing_years >= 3:
        adjustments += 20
    elif data.itf_filing_years >= 1:
        adjustments += 10
    if emi_ratio <= 0.20:
        adjustments += 25
    elif emi_ratio <= 0.30:
        adjustments += 10
    elif emi_ratio <= 0.40:
        adjustments -= 20
    elif emi_ratio <= 0.50:
        adjustments -= 50
    elif emi_ratio <= 0.65:
        adjustments -= 100
    else:
        adjustments -= 180
    adjustments -= data.past_defaults * 100
    adjustments -= data.delayed_payments * 10
    total_assets = data.property_value + data.machinery_value + data.inventory_value
    if total_assets >= 5000000:
        adjustments += 40
    elif total_assets >= 2000000:
        adjustments += 25
    elif total_assets >= 500000:
        adjustments += 10
    if data.bank_account_years >= 5:
        adjustments += 15
    elif data.bank_account_years >= 2:
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
def generate_msme_reason_codes(
    data: MSMEApplicantData, 
    emi_ratio: float,
    emi_override: bool = False
) -> List[str]:
    reasons = []
    if emi_override:
        if emi_ratio > 0.65:
            reasons.append(f"⚠️ CRITICAL: Total EMI is {emi_ratio*100:.0f}% of monthly revenue - loan is unaffordable")
        elif emi_ratio > 0.50:
            reasons.append(f"⚠️ WARNING: Total EMI is {emi_ratio*100:.0f}% of revenue - high financial stress risk")
    if data.gst_registered == 1 and data.udyam_registered == 1:
        reasons.append("✅ Fully compliant (GST + UDYAM registered)")
    elif data.gst_registered == 1:
        reasons.append("GST registered, but UDYAM registration missing")
    elif data.udyam_registered == 1:
        reasons.append("UDYAM registered, but GST registration missing")
    else:
        reasons.append("⚠️ Non-compliant: No GST or UDYAM registration")
    if data.years_in_operation >= 5:
        reasons.append(f"Established business ({data.years_in_operation} years in operation)")
    elif data.years_in_operation >= 2:
        reasons.append(f"Growing business ({data.years_in_operation} years in operation)")
    else:
        reasons.append("New business with limited track record")
    if data.past_defaults > 0:
        reasons.append(f"⚠️ Past loan default(s): {data.past_defaults}")
    if data.itf_filing_years >= 3:
        reasons.append(f"Strong tax compliance ({data.itf_filing_years} years ITR filed)")
    elif data.itf_filing_years >= 1:
        reasons.append(f"Moderate tax compliance ({data.itf_filing_years} year(s) ITR filed)")
    else:
        reasons.append("No ITR filing history")
    total_assets = data.property_value + data.machinery_value + data.inventory_value
    if total_assets >= 2000000:
        reasons.append(f"Strong asset backing (₹{total_assets/100000:.1f}L)")
    elif total_assets >= 500000:
        reasons.append(f"Moderate asset backing (₹{total_assets/100000:.1f}L)")
    else:
        reasons.append("Limited asset backing")
    return reasons[:6]
@msme_router.get("/health")
async def msme_health_check():
    return {
        "status": "healthy",
        "module": "MSME Credit Scoring",
        "model_loaded": msme_model_pipeline is not None
    }
@msme_router.get("/enterprise-categories")
async def get_enterprise_categories():
    return {
        "categories": ENTERPRISE_CATEGORIES,
        "definitions": {
            "Micro": {"turnover_limit": "₹5 Crore", "investment_limit": "₹1 Crore"},
            "Small": {"turnover_limit": "₹50 Crore", "investment_limit": "₹10 Crore"},
            "Medium": {"turnover_limit": "₹250 Crore", "investment_limit": "₹50 Crore"}
        }
    }
@msme_router.get("/industries")
async def get_industry_sectors():
    return {
        "industries": INDUSTRY_SECTORS,
        "count": len(INDUSTRY_SECTORS)
    }
@msme_router.get("/business-types")
async def get_business_types():
    return {
        "business_types": BUSINESS_TYPES
    }
@msme_router.get("/risk-matrix")
async def get_msme_risk_matrix():
    return {
        "matrix": MSME_RISK_MATRIX,
        "description": "Risk assessment based on compliance status and EMI burden"
    }
@msme_router.post("/predict", response_model=MSMEPredictionResponse)
async def predict_msme_risk(data: MSMEApplicantData):
    if msme_model_pipeline is None or msme_label_encoder is None:
        raise HTTPException(status_code=503, detail="MSME ML models not loaded. Please run msme_model_training.py first.")
    try:
        if data.monthly_revenue is None:
            monthly_revenue = data.annual_turnover / 12
        else:
            monthly_revenue = data.monthly_revenue
        if data.proposed_emi is None:
            proposed_emi = calculate_emi(data.loan_amount_requested, data.loan_tenure_months)
        else:
            proposed_emi = data.proposed_emi
        credit_history_length = data.credit_history_length or (data.bank_account_years * 12)
        total_emi = proposed_emi + data.existing_emi
        emi_to_revenue_ratio = total_emi / monthly_revenue
        total_asset_value = data.property_value + data.machinery_value + data.inventory_value
        loan_to_turnover_ratio = data.loan_amount_requested / data.annual_turnover
        input_dict = {
            'enterprise_category': data.enterprise_category,
            'business_type': data.business_type,
            'industry_sector': data.industry_sector,
            'years_in_operation': data.years_in_operation,
            'annual_turnover': data.annual_turnover,
            'monthly_revenue': monthly_revenue,
            'employee_count': data.employee_count,
            'gst_registered': data.gst_registered,
            'udyam_registered': data.udyam_registered,
            'itf_filing_years': data.itf_filing_years,
            'existing_loans': data.existing_loans,
            'existing_emi': data.existing_emi,
            'bank_account_years': data.bank_account_years,
            'credit_history_length': credit_history_length,
            'past_defaults': data.past_defaults,
            'delayed_payments': data.delayed_payments,
            'land_owned': data.land_owned,
            'property_value': data.property_value,
            'machinery_value': data.machinery_value,
            'inventory_value': data.inventory_value,
            'loan_amount_requested': data.loan_amount_requested,
            'loan_tenure_months': data.loan_tenure_months,
            'proposed_emi': proposed_emi,
            'emi_to_revenue_ratio': emi_to_revenue_ratio,
            'total_asset_value': total_asset_value,
            'loan_to_turnover_ratio': loan_to_turnover_ratio
        }
        input_df = pd.DataFrame([input_dict])
        prediction_encoded = msme_model_pipeline.predict(input_df)
        prediction_label = msme_label_encoder.inverse_transform(prediction_encoded)[0]
        probabilities = msme_model_pipeline.predict_proba(input_df)[0]
        prob_dict = {label: float(prob) for label, prob in zip(msme_label_encoder.classes_, probabilities)}
        emi_override_applied = False
        if emi_to_revenue_ratio > 0.65:
            prediction_label = "High"
            prob_dict = {"High": 0.99, "Medium": 0.01, "Low": 0.00}
            emi_override_applied = True
        elif emi_to_revenue_ratio > 0.50 and prediction_label == "Low":
            prediction_label = "Medium"
            prob_dict = {"High": 0.35, "Medium": 0.60, "Low": 0.05}
            emi_override_applied = True
        elif data.past_defaults > 0 and emi_to_revenue_ratio > 0.40:
            prediction_label = "High"
            prob_dict = {"High": 0.95, "Medium": 0.05, "Low": 0.00}
            emi_override_applied = True
        credit_score, score_category = calculate_msme_credit_score(
            risk_bucket=prediction_label,
            confidence_scores=prob_dict,
            data=data,
            emi_ratio=emi_to_revenue_ratio
        )
        if data.gst_registered == 1 and data.udyam_registered == 1:
            compliance_status = "Fully Compliant"
        elif data.gst_registered == 1 or data.udyam_registered == 1:
            compliance_status = "Partially Compliant"
        else:
            compliance_status = "Non-Compliant"
        reason_codes = generate_msme_reason_codes(data, emi_to_revenue_ratio, emi_override_applied)
        return MSMEPredictionResponse(
            risk_bucket=prediction_label,
            credit_score=credit_score,
            confidence_scores=prob_dict,
            monthly_revenue=monthly_revenue,
            emi_to_revenue_ratio=emi_to_revenue_ratio,
            total_emi_burden=total_emi,
            reason_codes=reason_codes,
            score_category=score_category,
            compliance_status=compliance_status
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"MSME Prediction error: {str(e)}")
