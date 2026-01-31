# NBCFDC AI/ML Credit Scoring System

A complete full-stack web application for AI-assisted credit scoring designed specifically for NBCFDC (National Backward Classes Finance & Development Corporation) beneficiaries in India's informal economy.

## 🌟 Features

- **Proxy-Based Scoring**: Uses occupation, business stability, and community ties instead of traditional credit scores
- **Real-Time Assessment**: Instant credit scoring with detailed explanations
- **Explainable AI**: Every decision comes with clear reason codes
- **Modern UI**: Clean, government-style interface built with React and Tailwind CSS
- **RESTful API**: Scalable Flask backend with comprehensive validation
- **Interactive Demo**: Try the scoring system with sample data

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── app.py                  # Flask API server
│   ├── scoring_engine.py       # Core credit scoring logic
│   ├── requirements.txt        # Python dependencies
│   └── Procfile               # Deployment config
│
└── frontend/
    ├── src/
    │   ├── pages/             # React page components
    │   ├── components/        # Reusable UI components
    │   ├── api/              # API client
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx          # Entry point
    │   └── index.css         # Global styles
    ├── public/
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🧠 How It Works

### Three Core Metrics

1. **Estimated Income** - Based on occupation, business years, and assets
2. **Repayment Discipline Score** (0-100) - Based on SHG membership, stability, and dependents
3. **EMI-to-Income Ratio** - Measures repayment burden

### Risk Assessment Matrix

The system combines repayment discipline and income level to determine risk:

| Repayment \ Income | Low | Medium | High |
|-------------------|-----|--------|------|
| **Strong**        | Medium | Low | Low |
| **Moderate**      | Medium | Medium | Low |
| **New/Weak**      | High | Medium | Medium |

## 📊 API Endpoints

### POST /score
Score a loan application

**Request:**
```json
{
  "age": 38,
  "occupation": "Tailor",
  "business_years": 6,
  "asset_score": 1,
  "dependents": 2,
  "shg_member": 1,
  "proposed_emi": 2500,
  "first_time_borrower": 1
}
```

**Response:**
```json
{
  "estimated_income": 13500,
  "income_confidence": "High",
  "repayment_discipline_score": 76,
  "emi_to_income_ratio": 0.19,
  "risk_bucket": "Low",
  "reason_codes": [
    "Stable business activity with 5+ years experience",
    "SHG membership improves trust and repayment discipline",
    "Low EMI burden - comfortable repayment capacity"
  ]
}
```

### GET /occupations
Get list of supported occupations

### GET /risk-matrix
Get the risk assessment matrix

## 🎨 Tech Stack

### Frontend
- React 18
- React Router 6
- Tailwind CSS 3
- Axios
- Vite
- Lucide React (icons)

### Backend
- Python 3.9+
- Flask 3.0
- Flask-CORS
- Gunicorn

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-backend-url>`

### Backend (Render/Railway)

1. Push code to GitHub
2. Create new Web Service
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Enable CORS for your frontend domain

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

Update this to your production backend URL when deploying.

## 🧪 Testing the System

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Click "Try the Demo"
4. Fill in the form with sample data:
   - Age: 38
   - Occupation: Tailor
   - Business Years: 6
   - Asset Score: 1 (Minimal assets)
   - Dependents: 2
   - SHG Member: Yes
   - Proposed EMI: 2500
   - First-Time Borrower: Yes
5. Click "Score Application"
6. View detailed results with metrics and reason codes

## 📄 License

This project is developed for NBCFDC to support financial inclusion initiatives.

## 👥 Team

- AI Researchers
- Backend Engineers
- Frontend Developers
- Data Scientists
- Policy Advisors
- DevOps Engineers

## 🤝 Contributing

This is a demonstration project for NBCFDC. For collaboration opportunities, contact the development team.

## 📧 Contact

For questions or support, reach out to the NBCFDC AI team.

---

**Built with ❤️ for financial inclusion in India**
