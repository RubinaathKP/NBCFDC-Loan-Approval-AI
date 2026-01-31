import pandas as pd
import numpy as np
np.random.seed(42)
n = 15000
ENTERPRISE_CATEGORIES = ['Micro', 'Small', 'Medium']
BUSINESS_TYPES = ['Manufacturing', 'Services', 'Trading']
INDUSTRY_SECTORS = [
    'Textile', 'Food Processing', 'Agriculture', 'IT Services',
    'Auto Components', 'General Manufacturing', 'Retail',
    'Hospitality', 'Healthcare', 'Education Services'
]
ENTERPRISE_PROFILES = {
    'Micro': {
        'turnover': (2e5, 5e6),
        'employees': (1, 49),
        'loan': (5e4, 1e6),
        'gst': 0.4,
        'udyam': 0.5,
        'property': 0.3
    },
    'Small': {
        'turnover': (5e6, 5e7),
        'employees': (50, 149),
        'loan': (1e6, 1e7),
        'gst': 0.85,
        'udyam': 0.75,
        'property': 0.6
    },
    'Medium': {
        'turnover': (5e7, 5e8),
        'employees': (150, 500),
        'loan': (1e7, 5e7),
        'gst': 0.98,
        'udyam': 0.95,
        'property': 0.85
    }
}
INDUSTRY_RISK = {
    'Textile': 1.0,
    'Food Processing': 0.9,
    'Agriculture': 1.2,
    'IT Services': 0.8,
    'Auto Components': 1.0,
    'General Manufacturing': 1.0,
    'Retail': 0.95,
    'Hospitality': 1.3,
    'Healthcare': 0.7,
    'Education Services': 0.85
}
enterprise_category = np.random.choice(
    ENTERPRISE_CATEGORIES, n, p=[0.6, 0.3, 0.1]
)
business_type = np.random.choice(BUSINESS_TYPES, n)
industry_sector = np.random.choice(INDUSTRY_SECTORS, n)
years_in_operation = np.clip(
    np.random.exponential(scale=5, size=n).astype(int), 0, 30
)
annual_turnover = []
monthly_revenue = []
employee_count = []
loan_amount_requested = []
gst_registered = []
udyam_registered = []
land_owned = []
for cat in enterprise_category:
    p = ENTERPRISE_PROFILES[cat]
    turnover = np.random.randint(*p['turnover'])
    annual_turnover.append(turnover)
    monthly_revenue.append(turnover / 12 * np.random.uniform(0.8, 1.2))
    employee_count.append(np.random.randint(*p['employees']))
    loan_amount_requested.append(
        np.random.randint(p['loan'][0], min(p['loan'][1], int(turnover * 0.5)))
    )
    gst_registered.append(int(np.random.rand() < p['gst']))
    udyam_registered.append(int(np.random.rand() < p['udyam']))
    land_owned.append(int(np.random.rand() < p['property']))
existing_loans = np.random.choice([0, 1, 2, 3], n, p=[0.4, 0.35, 0.2, 0.05])
existing_emi = [
    np.random.randint(4000, 15000) if l > 0 else 0
    for l in existing_loans
]
bank_account_years = np.clip(years_in_operation + np.random.randint(1, 3, n), 1, 20)
credit_history_length = np.clip(bank_account_years * 12 + np.random.randint(-6, 12, n), 0, 180)
past_defaults = np.random.choice([0, 1, 2], n, p=[0.85, 0.12, 0.03])
delayed_payments = np.random.choice([0, 1, 2, 3, 4], n, p=[0.45, 0.25, 0.15, 0.1, 0.05])
property_value = [
    np.random.randint(1e5, 5e6) if l else 0 for l in land_owned
]
machinery_value = [int(t * np.random.uniform(0.05, 0.2)) for t in annual_turnover]
inventory_value = [int(t / 12 * np.random.uniform(0.5, 1.5)) for t in annual_turnover]
loan_tenure_months = np.random.choice([12, 24, 36, 48, 60], n, p=[0.1, 0.25, 0.35, 0.2, 0.1])
interest_rate = 0.12 / 12
proposed_emi = [
    (loan * interest_rate * ((1 + interest_rate) ** t)) /
    (((1 + interest_rate) ** t) - 1)
    for loan, t in zip(loan_amount_requested, loan_tenure_months)
]
df = pd.DataFrame({
    'business_id': [f'MSME{i:05}' for i in range(1, n + 1)],
    'enterprise_category': enterprise_category,
    'business_type': business_type,
    'industry_sector': industry_sector,
    'years_in_operation': years_in_operation,
    'annual_turnover': annual_turnover,
    'monthly_revenue': monthly_revenue,
    'employee_count': employee_count,
    'gst_registered': gst_registered,
    'udyam_registered': udyam_registered,
    'existing_loans': existing_loans,
    'existing_emi': existing_emi,
    'bank_account_years': bank_account_years,
    'credit_history_length': credit_history_length,
    'past_defaults': past_defaults,
    'delayed_payments': delayed_payments,
    'land_owned': land_owned,
    'property_value': property_value,
    'machinery_value': machinery_value,
    'inventory_value': inventory_value,
    'loan_amount_requested': loan_amount_requested,
    'loan_tenure_months': loan_tenure_months,
    'proposed_emi': proposed_emi
})
df['emi_to_revenue_ratio'] = (
    df['proposed_emi'] + df['existing_emi']
) / df['monthly_revenue']
df['total_asset_value'] = (
    df['property_value'] +
    df['machinery_value'] +
    df['inventory_value']
)
df['loan_to_turnover_ratio'] = (
    df['loan_amount_requested'] / df['annual_turnover']
)
def emi_penalty(row):
    penalty = row['emi_to_revenue_ratio'] * 40
    if row['years_in_operation'] >= 5:
        penalty *= 0.75
    if row['gst_registered'] and row['udyam_registered']:
        penalty *= 0.85
    if row['total_asset_value'] / row['loan_amount_requested'] >= 1:
        penalty *= 0.8
    return penalty
industry_risk = df['industry_sector'].map(INDUSTRY_RISK)
df['risk_score'] = (
    np.log1p(df['years_in_operation']) * 14 +
    np.log1p(df['annual_turnover'] / 1e5) * 12 +
    np.log1p(df['employee_count']) * 5 +
    df['gst_registered'] * 16 +
    df['udyam_registered'] * 14 +
    np.log1p(df['bank_account_years']) * 8 +
    np.log1p(df['credit_history_length']) * 4 +
    np.log1p(df['total_asset_value'] / 1e5) * 10 -
    df['past_defaults'] * 35 -
    df['delayed_payments'] * 8 -
    df.apply(emi_penalty, axis=1) -
    df['loan_to_turnover_ratio'] * 12 -
    df['existing_loans'] * 5 -
    industry_risk * 4 +
    np.random.normal(0, 3, n)
)
df['risk_bucket'] = pd.qcut(
    df['risk_score'],
    q=[0, 0.3, 0.7, 1.0],
    labels=['High', 'Medium', 'Low']
)
df.to_csv('msme_loan_data.csv', index=False)
print(df['risk_bucket'].value_counts(normalize=True))
