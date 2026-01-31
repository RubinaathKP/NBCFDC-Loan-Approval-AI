import React, { useState, useEffect } from 'react';
import { usePredictRisk } from '../hooks/useRiskPrediction';
import { Loader2, AlertCircle, CheckCircle2, TrendingUp, DollarSign, Activity, User, MapPin, Briefcase, Calculator } from 'lucide-react';
import { healthCheck } from '../api/scoring';
const DemoPage = () => {
    const [formData, setFormData] = useState({
        age: '',
        area_type: '',
        occupation: '',
        business_years: '',
        residence_years: '',
        asset_score: '',
        dependents: '',
        shg_member: '',
        proposed_emi: '',
        first_time_borrower: '',
    });
    useEffect(() => {
        const checkAPI = async () => {
            try {
                await healthCheck();
            } catch (error) {
                console.error('Backend check failed:', error);
            }
        };
        checkAPI();
    }, []);
    const { mutate: predictRisk, isLoading, data: result, error, reset } = usePredictRisk();
    const occupations = [
        'Daily Wage Worker', 'Tailor', 'Street Vendor', 'Agriculture',
        'Small Retail Shop', 'Auto Driver', 'Delivery Worker',
        'Handloom Weaver', 'Milk Vendor', 'Garment Manufacturer'
    ];
    const areaTypes = ['Rural', 'Semi-Urban', 'Urban'];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) reset();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            age: parseInt(formData.age),
            area_type: formData.area_type,
            occupation: formData.occupation,
            estimated_monthly_income: null,
            business_years: parseInt(formData.business_years),
            residence_years: parseInt(formData.residence_years),
            asset_score: parseInt(formData.asset_score),
            dependents: parseInt(formData.dependents),
            shg_member: parseInt(formData.shg_member),
            proposed_emi: parseFloat(formData.proposed_emi),
            first_time_borrower: parseInt(formData.first_time_borrower),
        };
        predictRisk(payload);
    };
    const getScoreColor = (score) => {
        if (score >= 75) return 'text-green-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-teal-600 to-emerald-800 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
                        <User className="mr-3 w-10 h-10" />
                        Beneficiary Scoring
                    </h1>
                    <p className="text-xl text-teal-100">
                        AI-powered credit assessment for individual borrowers
                    </p>
                </div>
            </section>
            {}
            <section className="py-8 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {}
                        <div className="card bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Applicant Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 flex items-center"><User className="w-4 h-4 mr-1" /> Profile</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Age</label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                                min="18"
                                                max="100"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Dependents</label>
                                            <input
                                                type="number"
                                                name="dependents"
                                                value={formData.dependents}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                                min="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Area Type</label>
                                            <select
                                                name="area_type"
                                                value={formData.area_type}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select Area</option>
                                                {areaTypes.map(area => (
                                                    <option key={area} value={area}>{area}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Residence Duration (Years)</label>
                                            <input
                                                type="number"
                                                name="residence_years"
                                                value={formData.residence_years}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 flex items-center"><Briefcase className="w-4 h-4 mr-1" /> Occupation</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Occupation</label>
                                            <select
                                                name="occupation"
                                                value={formData.occupation}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select Occupation</option>
                                                {occupations.map(occ => (
                                                    <option key={occ} value={occ}>{occ}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Business Experience (Years)</label>
                                            <input
                                                type="number"
                                                name="business_years"
                                                value={formData.business_years}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                                min="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">First Time Borrower?</label>
                                            <select
                                                name="first_time_borrower"
                                                value={formData.first_time_borrower}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-teal-800 flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Financials</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Asset Score</label>
                                            <select
                                                name="asset_score"
                                                value={formData.asset_score}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select Asset Level</option>
                                                <option value="0">0 - No assets</option>
                                                <option value="1">1 - Minimal assets</option>
                                                <option value="2">2 - Significant assets</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">SHG Member?</label>
                                            <select
                                                name="shg_member"
                                                value={formData.shg_member}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="1">Yes</option>
                                                <option value="0">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="label-text block text-sm font-medium text-gray-600 mb-1">Proposed EMI (₹)</label>
                                            <input
                                                type="number"
                                                name="proposed_emi"
                                                value={formData.proposed_emi}
                                                onChange={handleChange}
                                                className="input-field w-full p-2 border rounded-md"
                                                required
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-4 rounded-lg transition duration-200 flex items-center justify-center shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={20} />
                                            Analyzing Profile...
                                        </>
                                    ) : (
                                        'Predict Credit Score'
                                    )}
                                </button>
                            </form>
                            {error && (
                                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start">
                                    <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700 text-sm">
                                        {error.response?.data?.detail || 'Analysis failed. Please check your inputs.'}
                                    </p>
                                </div>
                            )}
                        </div>
                        {}
                        <div>
                            {result ? (
                                <div className="space-y-6 animate-slide-up sticky top-8">
                                    {}
                                    <div className="bg-gradient-to-br from-teal-700 to-emerald-800 rounded-xl shadow-2xl text-white p-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <User size={150} />
                                        </div>
                                        <div className="relative z-10 text-center">
                                            <h3 className="text-teal-200 text-sm font-bold uppercase tracking-wider mb-2">Credit Score</h3>
                                            <div className="text-7xl font-bold leading-none mb-2">{result.credit_score}</div>
                                            <div className="text-teal-300 mb-6">out of 900</div>
                                            <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/10">
                                                <span className={`w-3 h-3 rounded-full ${result.risk_bucket === 'Low' ? 'bg-green-400' :
                                                        result.risk_bucket === 'Medium' ? 'bg-yellow-400' :
                                                            'bg-red-400'
                                                    }`}></span>
                                                <span className="font-semibold">{result.score_category}</span>
                                                <span className="text-teal-200">•</span>
                                                <span className="text-teal-200">{result.risk_bucket} Risk</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 border-t border-teal-500/30 pt-4">
                                                <div className="text-left">
                                                    <div className="text-teal-300 text-xs uppercase">Est. Income</div>
                                                    <div className="font-semibold">₹{result.estimated_income.toLocaleString('en-IN')}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-teal-300 text-xs uppercase">Confidence</div>
                                                    <div className="font-semibold">{(Math.max(...Object.values(result.confidence_scores)) * 100).toFixed(0)}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {}
                                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                                        <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                                            <TrendingUp className="w-5 h-5 mr-2 text-teal-600" />
                                            Financial Health
                                        </h4>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">Discipline Score</span>
                                                    <span className="font-bold">{result.repayment_discipline_score}/100</span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${result.repayment_discipline_score >= 75 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                        style={{ width: `${result.repayment_discipline_score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">EMI Ratio ({(result.emi_to_income_ratio * 100).toFixed(1)}%)</span>
                                                    <span className={`font-bold ${result.emi_to_income_ratio > 0.4 ? 'text-red-500' : 'text-green-600'}`}>
                                                        {result.emi_to_income_ratio <= 0.4 ? 'Healthy' : 'Stressed'}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${result.emi_to_income_ratio > 0.4 ? 'bg-red-500' : 'bg-green-500'}`}
                                                        style={{ width: `${Math.min(result.emi_to_income_ratio * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {}
                                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                                        <div className="bg-gray-50 p-4 border-b border-gray-100">
                                            <h4 className="font-bold text-gray-800 flex items-center">
                                                <Activity className="w-5 h-5 mr-2 text-teal-600" />
                                                Key Factors
                                            </h4>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-3">
                                                {result.reason_codes.map((reason, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                                        <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
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
                                        <User size={48} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Score</h3>
                                    <p className="max-w-xs text-gray-500">
                                        Enter beneficiary details and submit to generate a comprehensive credit risk report.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default DemoPage;
