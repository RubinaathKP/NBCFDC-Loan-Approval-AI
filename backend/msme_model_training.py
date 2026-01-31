import pandas as pd
import numpy as np
import shap
import joblib
import matplotlib.pyplot as plt
import os
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.metrics import classification_report, confusion_matrix
from xgboost import XGBClassifier
if not os.path.exists("msme_loan_data.csv"):
    raise FileNotFoundError("Dataset not found. Generate msme_loan_data.csv first.")
df = pd.read_csv("msme_loan_data.csv")
print(f"Loaded {len(df)} MSME records")
feature_cols = [
    'enterprise_category', 'business_type', 'industry_sector',
    'years_in_operation', 'annual_turnover', 'monthly_revenue',
    'employee_count', 'gst_registered', 'udyam_registered',
    'itf_filing_years', 'existing_loans', 'existing_emi',
    'bank_account_years', 'credit_history_length',
    'past_defaults', 'delayed_payments',
    'land_owned', 'property_value', 'machinery_value',
    'inventory_value', 'loan_amount_requested',
    'loan_tenure_months', 'proposed_emi',
    'emi_to_revenue_ratio', 'total_asset_value',
    'loan_to_turnover_ratio'
]
X = df[feature_cols]
y = df['risk_bucket']
le = LabelEncoder()
y_encoded = le.fit_transform(y)
print("Risk Classes:", le.classes_)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)
numerical_cols = [
    'years_in_operation', 'annual_turnover', 'monthly_revenue',
    'employee_count', 'itf_filing_years', 'existing_loans',
    'existing_emi', 'bank_account_years', 'credit_history_length',
    'past_defaults', 'delayed_payments',
    'property_value', 'machinery_value', 'inventory_value',
    'loan_amount_requested', 'loan_tenure_months',
    'proposed_emi', 'emi_to_revenue_ratio',
    'total_asset_value', 'loan_to_turnover_ratio'
]
categorical_cols = ['enterprise_category', 'business_type', 'industry_sector']
binary_cols = ['gst_registered', 'udyam_registered', 'land_owned']
preprocessor = ColumnTransformer(
    transformers=[
        ('num', 'passthrough', numerical_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
        ('bin', 'passthrough', binary_cols)
    ]
)
xgb_model = XGBClassifier(
    n_estimators=300,
    max_depth=4,
    learning_rate=0.05,
    subsample=0.85,
    colsample_bytree=0.85,
    min_child_weight=5,
    gamma=1,
    reg_alpha=0.3,
    reg_lambda=1.2,
    objective='multi:softprob',
    eval_metric='mlogloss',
    random_state=42
)
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', xgb_model)
])
print("\nTraining MSME Risk Model...")
pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
joblib.dump(pipeline, "msme_risk_model.joblib")
joblib.dump(le, "risk_label_encoder.joblib")
print("\n✅ Model artifacts saved")
print("\nGenerating SHAP summary...")
X_test_transformed = pipeline.named_steps['preprocessor'].transform(X_test)
ohe_features = pipeline.named_steps['preprocessor'] \
    .transformers_[1][1] \
    .get_feature_names_out(categorical_cols)
all_feature_names = numerical_cols + list(ohe_features) + binary_cols
explainer = shap.TreeExplainer(pipeline.named_steps['classifier'])
shap_values = explainer.shap_values(X_test_transformed)
plt.figure(figsize=(12, 10))
shap.summary_plot(
    shap_values,
    X_test_transformed,
    feature_names=all_feature_names,
    show=False
)
plt.title(
    "SHAP Summary – MSME Loan Risk Prediction\n"
    "Key Drivers: EMI Stress, Credit History, Assets, Compliance",
    fontsize=12
)
plt.tight_layout()
plt.savefig("msme_shap_summary.png", dpi=150, bbox_inches='tight')
plt.close()
print("\n" + "=" * 60)
print("MSME LOAN RISK MODEL TRAINING COMPLETE")
print("=" * 60)
