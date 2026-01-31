import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import shap
import joblib
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder, LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import classification_report
def generate_data(n=10000):
    np.random.seed(42)
    age = np.random.randint(21, 61, n)
    area_type = np.random.choice(['Rural', 'Semi-Urban', 'Urban'], n, p=[0.50, 0.35, 0.15])
    occupations = ['Daily Wage Worker', 'Tailor', 'Street Vendor', 'Agriculture', 
                   'Small Retail Shop', 'Auto Driver', 'Delivery Worker', 
                   'Handloom Weaver', 'Milk Vendor', 'Garment Manufacturer']
    occupation = np.random.choice(occupations, n)
    def get_contextual_features(row_occ, row_area):
        occ_base_income = {'Daily Wage Worker': 8000, 'Tailor': 12000, 'Street Vendor': 11000, 
                           'Agriculture': 9500, 'Small Retail Shop': 18000, 'Auto Driver': 14000, 
                           'Delivery Worker': 15000, 'Handloom Weaver': 13000, 
                           'Milk Vendor': 12500, 'Garment Manufacturer': 25000}
        income = occ_base_income[row_occ] + np.random.randint(0, 5000)
        if row_area == 'Urban': income *= 1.15
        if row_occ in ['Garment Manufacturer', 'Small Retail Shop', 'Agriculture']:
            assets = np.random.choice([0, 1, 2], p=[0.1, 0.4, 0.5])
        elif row_occ in ['Auto Driver', 'Delivery Worker', 'Tailor']:
            assets = np.random.choice([0, 1, 2], p=[0.3, 0.5, 0.2])
        else:
            assets = np.random.choice([0, 1, 2], p=[0.6, 0.3, 0.1])
        return income, assets
    income_assets = [get_contextual_features(o, a) for o, a in zip(occupation, area_type)]
    income_list, asset_list = zip(*income_assets)
    df = pd.DataFrame({
        'age': age,
        'area_type': area_type,
        'occupation': occupation,
        'estimated_monthly_income': income_list,
        'asset_score': asset_list,
        'business_years': [np.random.randint(0, max(1, a - 20)) for a in age],
        'residence_years': [np.random.randint(1, max(2, a - 15)) for a in age],
        'shg_member': np.random.choice([0, 1], n, p=[0.5, 0.5]),
        'dependents': np.random.choice([1, 2, 3, 4, 5], n),
        'proposed_emi': np.random.randint(1000, 7000, n),
        'first_time_borrower': np.random.choice([0, 1], n, p=[0.6, 0.4])
    })
    df['emi_to_income_ratio'] = df['proposed_emi'] / df['estimated_monthly_income']
    df['risk_score'] = (
    (-abs(df['age'] - 40) * 0.8 + 35) +
    np.log1p(df['business_years']) * 18 +
    np.log1p(df['residence_years']) * 10 +
    df['shg_member'] * 12 +
    df['asset_score'] * 15 +
    np.log1p(df['estimated_monthly_income']) * 8 +
    -(df['dependents'] * 6) +
    -(df['emi_to_income_ratio'] * 55) +
    np.random.normal(0, 3, n)
)
    df.loc[df['first_time_borrower'] == 1, 'risk_score'] -= 8
    df['risk_bucket'] = pd.qcut(df['risk_score'], q=[0, 0.3, 0.7, 1.0], labels=['High', 'Medium', 'Low'])
    return df
df = generate_data()
X = df.drop(columns=['risk_score', 'risk_bucket'])
y = df['risk_bucket']
le = LabelEncoder()
y_encoded = le.fit_transform(y)
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
num_cols = ['age', 'estimated_monthly_income', 'asset_score', 'business_years', 
            'residence_years', 'dependents', 'proposed_emi', 'emi_to_income_ratio']
cat_cols = ['area_type', 'occupation', 'shg_member', 'first_time_borrower']
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), num_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
])
clf = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', XGBClassifier(n_estimators=100, max_depth=4, learning_rate=0.1, random_state=42))
])
clf.fit(X_train, y_train)
joblib.dump(clf, 'nbcfdc_model.joblib')
joblib.dump(le, 'label_encoder.joblib')
model = clf.named_steps['classifier']
transformed_X_test = clf.named_steps['preprocessor'].transform(X_test)
ohe_feature_names = clf.named_steps['preprocessor'].transformers_[1][1].get_feature_names_out(cat_cols)
all_feature_names = num_cols + list(ohe_feature_names)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(transformed_X_test)
print(classification_report(y_test, clf.predict(X_test), target_names=le.classes_))
