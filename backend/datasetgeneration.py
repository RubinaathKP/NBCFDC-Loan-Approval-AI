import pandas as pd
import numpy as np
np.random.seed(42)
n = 10000
age = np.random.randint(21, 61, n)
area_type = np.random.choice(
    ['Rural', 'Semi-Urban', 'Urban'],
    n, p=[0.50, 0.35, 0.15]
)
occupations = [
    'Daily Wage Worker', 'Tailor', 'Street Vendor', 'Agriculture',
    'Small Retail Shop', 'Auto Driver', 'Delivery Worker',
    'Handloom Weaver', 'Milk Vendor', 'Garment Manufacturer'
]
occupation = np.random.choice(occupations, n)
def get_contextual_features(row_occ, row_area):
    occ_base_income = {
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
    income = occ_base_income[row_occ] + np.random.randint(0, 5000)
    if row_area == 'Urban':
        income *= 1.15
    if row_occ in ['Garment Manufacturer', 'Small Retail Shop', 'Agriculture']:
        assets = np.random.choice([0, 1, 2], p=[0.1, 0.4, 0.5])
    elif row_occ in ['Auto Driver', 'Delivery Worker', 'Tailor']:
        assets = np.random.choice([0, 1, 2], p=[0.3, 0.5, 0.2])
    else:
        assets = np.random.choice([0, 1, 2], p=[0.6, 0.3, 0.1])
    return income, assets
income_assets = [get_contextual_features(o, a) for o, a in zip(occupation, area_type)]
income_list, asset_list = zip(*income_assets)
business_years = [
    np.random.randint(0, max(1, a - 20)) for a in age
]
residence_years = [
    np.random.randint(1, max(2, a - 15)) for a in age
]
df = pd.DataFrame({
    'beneficiary_id': [f'B{i:05}' for i in range(1, n + 1)],
    'age': age,
    'area_type': area_type,
    'occupation': occupation,
    'estimated_monthly_income': income_list,
    'asset_score': asset_list,
    'business_years': business_years,
    'residence_years': residence_years,
    'shg_member': np.random.choice([0, 1], n, p=[0.5, 0.5]),
    'dependents': np.random.choice([1, 2, 3, 4, 5], n),
    'proposed_emi': np.random.randint(1000, 7000, n),
    'first_time_borrower': np.random.choice([0, 1], n, p=[0.6, 0.4])
})
df['emi_to_income_ratio'] = df['proposed_emi'] / df['estimated_monthly_income']
df['risk_score'] = (
    np.log1p(df['business_years']) * 18 +
    np.log1p(df['residence_years']) * 10 +
    df['shg_member'] * 28 +
    df['asset_score'] * 14 +
    (df['estimated_monthly_income'] / 1200) -
    (df['dependents'] * 4) -
    (df['emi_to_income_ratio'] * 40) +
    np.random.normal(0, 6, n)
)
df.loc[df['first_time_borrower'] == 1, 'risk_score'] -= 12
df['risk_bucket'] = pd.qcut(
    df['risk_score'],
    q=[0, 0.3, 0.7, 1.0],
    labels=['High', 'Medium', 'Low']
)
df.to_csv('nbcfdc_stability_data.csv', index=False)
print("Refactored dataset generated successfully")
print(df['risk_bucket'].value_counts(normalize=True))
print(df.head())
