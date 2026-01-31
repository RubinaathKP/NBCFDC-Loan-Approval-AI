import React, { useState, useEffect } from 'react';
import {
    getEnterpriseCategories,
    getBusinessTypes,
    getIndustrySectors,
    predictMSMERisk
} from '../api/scoring';
import { Loader2, AlertCircle, CheckCircle2, TrendingUp, DollarSign, Activity, Building2, ShieldCheck, Calculator } from 'lucide-react';
const MSMEPage = () => {
    const [categories, setCategories] = useState([]);
    const [businessTypes, setBusinessTypes] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [formData, setFormData] = useState({
        enterprise_category: '',
        business_type: '',
        industry_sector: '',
        years_in_operation: '',
        annual_turnover: '',
        employee_count: '',
        gst_registered: '',
        udyam_registered: '',
        itf_filing_years: '',
        existing_loans: '',
        existing_emi: '',
        bank_account_years: '',
        past_defaults: '',
        delayed_payments: '',
        land_owned: '',
        property_value: '',
        machinery_value: '',
        inventory_value: '',
        loan_amount_requested: '',
        loan_tenure_months: '',
    });
    const [estimatedEMI, setEstimatedEMI] = useState(0);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [cats, types, inds] = await Promise.all([
                    getEnterpriseCategories(),
                    getBusinessTypes(),
                    getIndustrySectors()
                ]);
                setCategories(cats.categories);
                setBusinessTypes(types.business_types);
                setIndustries(inds.industries);
            } catch (err) {
                console.error("Failed to load form options:", err);
                setError({ message: "Failed to load form options. Is backend running?" });
            } finally {
                setLoadingOptions(false);
            }
        };
        fetchOptions();
    }, []);
    useEffect(() => {
        const principal = parseFloat(formData.loan_amount_requested) || 0;
        const tenureMonths = parseInt(formData.loan_tenure_months) || 0;
        const annualRate = 0.12; 
        if (principal > 0 && tenureMonths > 0) {
            const monthlyRate = annualRate / 12;
            const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);
            setEstimatedEMI(Math.round(emi));
        } else {
            setEstimatedEMI(0);
        }
    }, [formData.loan_amount_requested, formData.loan_tenure_months]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const payload = {
                enterprise_category: formData.enterprise_category,
                business_type: formData.business_type,
                industry_sector: formData.industry_sector,
                years_in_operation: parseInt(formData.years_in_operation || 0),
                annual_turnover: parseFloat(formData.annual_turnover || 0),
                employee_count: parseInt(formData.employee_count || 1),
                gst_registered: formData.gst_registered === '1' ? 1 : 0,
                udyam_registered: formData.udyam_registered === '1' ? 1 : 0,
                itf_filing_years: parseInt(formData.itf_filing_years || 0),
                existing_loans: parseInt(formData.existing_loans || 0),
                existing_emi: parseFloat(formData.existing_emi || 0),
                bank_account_years: parseInt(formData.bank_account_years || 0),
                past_defaults: parseInt(formData.past_defaults || 0),
                delayed_payments: parseInt(formData.delayed_payments || 0),
                land_owned: parseInt(formData.land_owned || 0),
                property_value: parseFloat(formData.property_value || 0),
                machinery_value: parseFloat(formData.machinery_value || 0),
                inventory_value: parseFloat(formData.inventory_value || 0),
                loan_amount_requested: parseFloat(formData.loan_amount_requested || 0),
                loan_tenure_months: parseInt(formData.loan_tenure_months || 0),
                proposed_emi: estimatedEMI
            };
            const data = await predictMSMERisk(payload);
            setResult(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    const getScoreColor = (score) => {
        if (score >= 800) return 'text-green-600';
        if (score >= 700) return 'text-emerald-600';
        if (score >= 600) return 'text-yellow-600';
        return 'text-red-600';
    };
    const totalAssets = (parseFloat(formData.property_value || 0) +
        parseFloat(formData.machinery_value || 0) +
        parseFloat(formData.inventory_value || 0));
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                        <Building2 className="mr-3 w-10 h-10" />
                        MSME Credit Scoring
                    </h1>
                    <p className="text-xl text-blue-100">
                        AI-powered risk assessment for Business Loans
                    </p>
                </div>
            </section>
            {}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loadingOptions ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {}
                            <div className="card bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Application Form</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {}
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                        <h3 className="font-semibold text-blue-800 mb-3 flex items-center text-lg">
                                            <Calculator className="w-5 h-5 mr-2" /> Loan Requirements
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
                                                <input
                                                    type="number"
                                                    name="loan_amount_requested"
                                                    value={formData.loan_amount_requested}
                                                    onChange={handleChange}
                                                    className="input-field w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                    required
                                                    min="10000"
                                                />
                                            </div>
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-700 mb-1">Tenure (Months)</label>
                                                <select
                                                    name="loan_tenure_months"
                                                    value={formData.loan_tenure_months}
                                                    onChange={handleChange}
                                                    className="input-field w-full p-2 border rounded-md"
                                                    required
                                                >
                                                    <option value="" disabled>Select Tenure</option>
                                                    <option value="12">12 Months (1 Year)</option>
                                                    <option value="24">24 Months (2 Years)</option>
                                                    <option value="36">36 Months (3 Years)</option>
                                                    <option value="48">48 Months (4 Years)</option>
                                                    <option value="60">60 Months (5 Years)</option>
                                                    <option value="84">84 Months (7 Years)</option>
                                                </select>
                                            </div>
                                        </div>
                                        {}
                                        <div className="mt-3 flex justify-between items-center bg-white p-3 rounded border border-blue-200">
                                            <span className="text-gray-600 font-medium">Estimated EMI:</span>
                                            <span className="text-xl font-bold text-blue-700">₹{estimatedEMI.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                    {}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-800 border-b pb-1">Business Profile</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Enterprise Type</label>
                                                <select name="enterprise_category" value={formData.enterprise_category} onChange={handleChange} className="input-field w-full p-2 border rounded-md" required>
                                                    <option value="" disabled>Select Category</option>
                                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Sector</label>
                                                <select name="industry_sector" value={formData.industry_sector} onChange={handleChange} className="input-field w-full p-2 border rounded-md" required>
                                                    <option value="" disabled>Select Sector</option>
                                                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Years in Business</label>
                                                <input type="number" name="years_in_operation" value={formData.years_in_operation} onChange={handleChange} className="input-field w-full p-2 border rounded-md" min="0" required />
                                            </div>
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Annual Turnover (₹)</label>
                                                <input type="number" name="annual_turnover" value={formData.annual_turnover} onChange={handleChange} className="input-field w-full p-2 border rounded-md" min="0" required />
                                            </div>
                                        </div>
                                    </div>
                                    {}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-800 border-b pb-1">Assets & Collateral</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="label-text block text-xs font-medium text-gray-500 mb-1">Property Value</label>
                                                <input type="number" name="property_value" value={formData.property_value} onChange={handleChange} className="input-field w-full p-2 border rounded-md text-sm" />
                                            </div>
                                            <div>
                                                <label className="label-text block text-xs font-medium text-gray-500 mb-1">Machinery</label>
                                                <input type="number" name="machinery_value" value={formData.machinery_value} onChange={handleChange} className="input-field w-full p-2 border rounded-md text-sm" />
                                            </div>
                                            <div>
                                                <label className="label-text block text-xs font-medium text-gray-500 mb-1">Stock/Inventory</label>
                                                <input type="number" name="inventory_value" value={formData.inventory_value} onChange={handleChange} className="input-field w-full p-2 border rounded-md text-sm" />
                                            </div>
                                        </div>
                                        <div className="text-right text-sm text-gray-600 font-medium">
                                            Total Assets: ₹{totalAssets.toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                    {}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-gray-800 border-b pb-1">Compliance & Risks</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="checkbox" checked={formData.gst_registered === '1'} onChange={(e) => setFormData(p => ({ ...p, gst_registered: e.target.checked ? '1' : '0' }))} className="w-4 h-4 text-blue-600 rounded" />
                                                    <span className="text-sm text-gray-700">GST Registered</span>
                                                </label>
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input type="checkbox" checked={formData.udyam_registered === '1'} onChange={(e) => setFormData(p => ({ ...p, udyam_registered: e.target.checked ? '1' : '0' }))} className="w-4 h-4 text-blue-600 rounded" />
                                                    <span className="text-sm text-gray-700">UDYAM Registered</span>
                                                </label>
                                            </div>
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Years of ITR Filed</label>
                                                <select name="itf_filing_years" value={formData.itf_filing_years} onChange={handleChange} className="input-field w-full p-2 border rounded-md" required>
                                                    <option value="" disabled>Select</option>
                                                    <option value="0">None</option>
                                                    <option value="1">1 Year</option>
                                                    <option value="2">2 Years</option>
                                                    <option value="3">3+ Years</option>
                                                </select>
                                            </div>
                                        </div>
                                        {}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="label-text block text-sm font-medium text-gray-600 mb-1">Existing Loans</label>
                                                <input type="number" name="existing_loans" value={formData.existing_loans} onChange={handleChange} className="input-field w-full p-2 border rounded-md" min="0" />
                                            </div>
                                            {parseInt(formData.existing_loans) > 0 && (
                                                <div className="animate-fade-in">
                                                    <label className="label-text block text-sm font-medium text-gray-600 mb-1">Total Monthly EMI (Existing)</label>
                                                    <input type="number" name="existing_emi" value={formData.existing_emi} onChange={handleChange} className="input-field w-full p-2 border rounded-md border-orange-200 bg-orange-50" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin mr-2" size={20} />
                                                Processing Application...
                                            </>
                                        ) : (
                                            'Calculate Credit Score'
                                        )}
                                    </button>
                                </form>
                                {error && (
                                    <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start">
                                        <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-700 text-sm">{error.response?.data?.detail || error.message || 'Analysis failed. Please try again.'}</p>
                                    </div>
                                )}
                            </div>
                            {}
                            <div>
                                {result ? (
                                    <div className="space-y-6 animate-slide-up sticky top-8">
                                        {}
                                        <div className="bg-gradient-to-br from-indigo-800 to-purple-900 rounded-xl shadow-2xl text-white p-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Building2 size={150} />
                                            </div>
                                            <div className="relative z-10 text-center">
                                                <h3 className="text-indigo-200 text-sm font-bold uppercase tracking-wider mb-2">Credit Score</h3>
                                                <div className="text-7xl font-bold leading-none mb-2">{result.credit_score}</div>
                                                <div className="text-indigo-300 mb-6">out of 900</div>
                                                <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                                                    <span className={`w-3 h-3 rounded-full ${result.risk_bucket === 'Low' ? 'bg-green-400' :
                                                        result.risk_bucket === 'Medium' ? 'bg-yellow-400' :
                                                            'bg-red-400'
                                                        }`}></span>
                                                    <span className="font-semibold">{result.score_category}</span>
                                                    <span className="text-indigo-200">•</span>
                                                    <span className="text-indigo-200">{result.risk_bucket} Risk</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 border-t border-indigo-500/30 pt-4">
                                                    <div className="text-left">
                                                        <div className="text-indigo-300 text-xs uppercase">Compliance</div>
                                                        <div className="font-semibold">{result.compliance_status}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-indigo-300 text-xs uppercase">Confidence</div>
                                                        <div className="font-semibold">{(Math.max(...Object.values(result.confidence_scores)) * 100).toFixed(0)}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {}
                                        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                            <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                                                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                                                Financial Health
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600">Monthly Revenue</span>
                                                        <span className="font-bold">₹{parseFloat(result.monthly_revenue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="text-gray-600">EMI Burden ({(result.emi_to_revenue_ratio * 100).toFixed(1)}%)</span>
                                                        <span className={`font-bold ${(result.emi_to_revenue_ratio > 0.5) ? 'text-red-500' : 'text-green-600'}`}>
                                                            ₹{parseFloat(result.total_emi_burden).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${(result.emi_to_revenue_ratio > 0.5) ? 'bg-red-500' : 'bg-green-500'}`}
                                                            style={{ width: `${Math.min(result.emi_to_revenue_ratio * 100, 100)}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {}
                                        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                            <div className="bg-gray-50 p-4 border-b border-gray-100">
                                                <h4 className="font-bold text-gray-800 flex items-center">
                                                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                                                    Key Factors
                                                </h4>
                                            </div>
                                            <div className="p-4">
                                                <ul className="space-y-3">
                                                    {result.reason_codes.map((reason, idx) => (
                                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                                                                {idx + 1}
                                                            </div>
                                                            {reason}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-400 sticky top-8 min-h-[400px]">
                                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                            <Building2 size={48} className="text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Score</h3>
                                        <p className="max-w-xs text-gray-500">
                                            Complete the business profile and loan requirements to generate a detailed risk assessment.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
export default MSMEPage;
