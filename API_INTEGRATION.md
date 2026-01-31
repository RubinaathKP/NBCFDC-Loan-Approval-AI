# Backend Integration - API Documentation

## 🚀 Quick Start

### Start All Servers (Recommended)
```powershell
.\start.ps1
```

### Start Backend Only
```powershell
cd backend
.\start-backend.ps1
```

### Start Frontend Only
```powershell
cd frontend
npm run dev
```

---

## 📡 Backend API Endpoints

### Base URL
- **Development**: `http://localhost:8000`
- **Production**: Update in frontend `.env` file

### Available Endpoints

#### 1. Health Check
```http
GET /
```

**Response:**
```json
{
  "status": "healthy",
  "service": "NBCFDC Credit Scoring API",
  "version": "1.0.0",
  "model_loaded": true
}
```

---

#### 2. Get Occupations
```http
GET /occupations
```

**Response:**
```json
{
  "occupations": [
    "Daily Wage Worker",
    "Tailor",
    "Street Vendor",
    "Agriculture",
    "Small Retail Shop",
    "Auto Driver",
    "Delivery Worker",
    "Handloom Weaver",
    "Milk Vendor",
    "Garment Manufacturer"
  ],
  "count": 10
}
```

---

#### 3. Get Risk Matrix
```http
GET /risk-matrix
```

**Response:**
```json
{
  "matrix": {
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
  },
  "description": "Risk assessment based on repayment discipline and income level"
}
```

---

#### 4. Predict Risk (Main Endpoint)
```http
POST /predict
```

**Request Body:**
```json
{
  "age": 38,
  "area_type": "Rural",
  "occupation": "Tailor",
  "estimated_monthly_income": 15000,
  "asset_score": 1,
  "business_years": 6,
  "residence_years": 5,
  "shg_member": 1,
  "dependents": 2,
  "proposed_emi": 2500,
  "first_time_borrower": 1
}
```

**Field Descriptions:**
| Field | Type | Range | Description |
|-------|------|-------|-------------|
| age | int | 18-100 | Age of applicant |
| area_type | string | - | Rural, Semi-Urban, or Urban |
| occupation | string | - | One of the supported occupations |
| estimated_monthly_income | float | >0 | Monthly income in ₹ |
| asset_score | int | 0-2 | 0=None, 1=Minimal, 2=Significant |
| business_years | int | ≥0 | Years in current business |
| residence_years | int | ≥0 | Years in current residence |
| shg_member | int | 0-1 | Self-Help Group member (0=No, 1=Yes) |
| dependents | int | ≥0 | Number of dependents |
| proposed_emi | float | >0 | Proposed monthly EMI in ₹ |
| first_time_borrower | int | 0-1 | First time borrower (0=No, 1=Yes) |

**Response:**
```json
{
  "risk_bucket": "Low",
  "confidence_scores": {
    "High": 0.12,
    "Low": 0.73,
    "Medium": 0.15
  },
  "estimated_income": 15000,
  "emi_to_income_ratio": 0.1667,
  "repayment_discipline_score": 85,
  "reason_codes": [
    "Stable business activity with 5+ years experience",
    "SHG membership improves trust and repayment discipline",
    "Low EMI burden - comfortable repayment capacity",
    "Strong repayment discipline indicators",
    "Minimal asset backing"
  ]
}
```

---

## 🎯 Frontend Integration

### React Query Hooks

#### 1. Predict Risk
```javascript
import { usePredictRisk } from '../hooks/useRiskPrediction';

const { mutate, isLoading, data, error } = usePredictRisk();

// Call prediction
mutate({
  age: 38,
  area_type: "Rural",
  // ... other fields
});
```

#### 2. Get Occupations
```javascript
import { useOccupations } from '../hooks/useRiskPrediction';

const { data, isLoading, error } = useOccupations();
```

#### 3. Get Risk Matrix
```javascript
import { useRiskMatrix } from '../hooks/useRiskPrediction';

const { data, isLoading, error } = useRiskMatrix();
```

#### 4. Health Check
```javascript
import { useHealthCheck } from '../hooks/useRiskPrediction';

const { data, isLoading } = useHealthCheck();
```

---

## 🔧 Configuration

### Environment Variables

**Frontend (`.env`):**
```env
VITE_API_URL=http://localhost:8000
```

**Production:**
```env
VITE_API_URL=https://your-backend-api.com
```

### CORS Configuration

The backend is currently configured to allow all origins in development:
```python
allow_origins=["*"]
```

For production, update this in `backend/app.py`:
```python
allow_origins=[
    "https://your-frontend-domain.com",
    "http://localhost:5173"  # Keep for local development
]
```

---

## 🧪 Testing the Integration

### Manual Testing

1. **Start both servers:**
   ```powershell
   .\start.ps1
   ```

2. **Open browser:**
   - Frontend: http://localhost:5173
   - Backend docs: http://localhost:8000/docs

3. **Navigate to Demo page** and fill the form with test data:
   - Age: 38
   - Area Type: Rural
   - Occupation: Tailor
   - Monthly Income: 15000
   - Business Years: 6
   - Residence Years: 5
   - Asset Score: 1
   - Dependents: 2
   - SHG Member: Yes
   - Proposed EMI: 2500
   - First-Time Borrower: Yes

4. **Click "Score Application"** and verify the response

### API Testing with cURL

```bash
# Test health check
curl http://localhost:8000/

# Test occupations
curl http://localhost:8000/occupations

# Test prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 38,
    "area_type": "Rural",
    "occupation": "Tailor",
    "estimated_monthly_income": 15000,
    "asset_score": 1,
    "business_years": 6,
    "residence_years": 5,
    "shg_member": 1,
    "dependents": 2,
    "proposed_emi": 2500,
    "first_time_borrower": 1
  }'
```

---

## 📦 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **XGBoost** - ML model
- **Pandas/NumPy** - Data processing
- **Scikit-learn** - ML utilities
- **Joblib** - Model serialization

### Frontend
- **React 18** - UI library
- **React Query** - Data fetching & caching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

---

## 🚀 Deployment

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Add environment variables if needed

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=<your-backend-url>`

---

## ✨ Key Features

✅ **Complete API Coverage** - All endpoints implemented and documented  
✅ **React Query Integration** - Automatic caching and state management  
✅ **Type Safety** - Pydantic models for request/response validation  
✅ **Error Handling** - Comprehensive error messages  
✅ **Interactive Docs** - FastAPI auto-generated docs at `/docs`  
✅ **ML Predictions** - Real XGBoost model predictions  
✅ **Explainable AI** - Reason codes for every prediction  
✅ **Easy Deployment** - Production-ready configuration  

---

## 🐛 Troubleshooting

### Backend won't start
- Check Python is installed: `python --version`
- Check models are present: `nbcfdc_model.joblib`, `label_encoder.joblib`
- Check port 8000 is free: `netstat -ano | findstr :8000`

### Frontend can't connect to backend
- Check backend is running: http://localhost:8000
- Check `.env` has correct URL: `VITE_API_URL=http://localhost:8000`
- Check CORS is configured correctly

### React Query not working
- Check QueryClientProvider is in `main.jsx`
- Check hooks are imported correctly
- Check React Query DevTools (optional): `npm install @tanstack/react-query-devtools`

---

**Built with ❤️ for NBCFDC financial inclusion initiative**
