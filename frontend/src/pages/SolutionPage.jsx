import React from 'react';
import { TrendingUp, DollarSign, Activity, Target, CheckCircle2 } from 'lucide-react';
const SolutionPage = () => {
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-gov-green-500 to-gov-green-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Solution</h1>
                    <p className="text-xl text-green-100">
                        AI-powered credit scoring designed for the informal economy
                    </p>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="card bg-green-50 border-l-4 border-gov-green-500">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Proxy-Based Credit Scoring for Financial Inclusion
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Instead of relying on credit history and bank statements, our system uses
                            <strong> proxy metrics</strong> that reflect the real creditworthiness of
                            informal economy workers—occupation stability, community ties, asset ownership,
                            and family structure.
                        </p>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-4">The 3 Core Metrics</h2>
                    <p className="section-subtitle text-center">
                        Our scoring engine evaluates every application using these key indicators
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {}
                        <div className="card bg-white">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <DollarSign className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">1. Estimated Income</h3>
                            <p className="text-gray-600 mb-4">
                                We estimate monthly income based on:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Occupation type</strong> (e.g., tailor, auto driver)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Business years</strong> (experience = higher income)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Asset ownership</strong> (tools, vehicles, property)</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Confidence Level:</strong> High/Medium/Low based on occupation stability
                                </p>
                            </div>
                        </div>
                        {}
                        <div className="card bg-white">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">2. Repayment Discipline</h3>
                            <p className="text-gray-600 mb-4">
                                Score from 0-100 based on:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>SHG membership</strong> (peer accountability)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Business stability</strong> (5+ years = strong)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Age & dependents</strong> (responsibility signals)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>First-time borrower</strong> (capped at 85)</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Categories:</strong> Strong (75+), Moderate (50-74), Weak (&lt;50)
                                </p>
                            </div>
                        </div>
                        {}
                        <div className="card bg-white">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Activity className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">3. EMI-to-Income Stress</h3>
                            <p className="text-gray-600 mb-4">
                                Critical repayment capacity indicator:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Safe:</strong> ≤ 25% (comfortable)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Moderate:</strong> 25-35% (manageable)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Elevated:</strong> 35-50% (concerning)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>High:</strong> 50-65% (serious stress)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Critical:</strong> &gt; 65% (auto High Risk)</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                <p className="text-sm text-red-700">
                                    <strong>⚠️ Safety Override:</strong> EMI &gt; 65% is automatically flagged as High Risk
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-4">Risk Bucket Matrix</h2>
                    <p className="section-subtitle text-center mb-12">
                        9 permutations combining repayment discipline and income level
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gov-blue-600 text-white">
                                    <th className="p-4 text-left font-semibold">Repayment Discipline ↓ / Income →</th>
                                    <th className="p-4 text-center font-semibold">Low Income<br />(&lt;₹10k)</th>
                                    <th className="p-4 text-center font-semibold">Medium Income<br />(₹10k-₹15k)</th>
                                    <th className="p-4 text-center font-semibold">High Income<br />(&gt;₹15k)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-semibold">Strong (75-100)</td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                            Low
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                            Low
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-semibold">Moderate (50-74)</td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                            Low
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-4 font-semibold">New/Weak (&lt;50)</td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                                            High
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                            Medium
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                            Medium
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="card bg-green-50">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span className="font-semibold">Low Risk:</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Approve with standard terms</p>
                        </div>
                        <div className="card bg-yellow-50">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <span className="font-semibold">Medium Risk:</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Approve with monitoring</p>
                        </div>
                        <div className="card bg-red-50">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                <span className="font-semibold">High Risk:</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Require additional verification</p>
                        </div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-4">Credit Score (200-900)</h2>
                    <p className="section-subtitle text-center mb-12">
                        A familiar score similar to CIBIL, combining ML predictions with business rules
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {}
                        <div className="card">
                            <h3 className="text-xl font-bold mb-4">Score Categories</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                                    <span className="font-semibold">800-900</span>
                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">Excellent</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-emerald-100 rounded-lg">
                                    <span className="font-semibold">700-799</span>
                                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm">Good</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                                    <span className="font-semibold">600-699</span>
                                    <span className="px-3 py-1 bg-yellow-500 text-white rounded-full text-sm">Fair</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-100 rounded-lg">
                                    <span className="font-semibold">500-599</span>
                                    <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">Below Average</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                                    <span className="font-semibold">200-499</span>
                                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">Poor</span>
                                </div>
                            </div>
                        </div>
                        {}
                        <div className="card">
                            <h3 className="text-xl font-bold mb-4">Score Calculation Factors</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Risk Bucket:</strong> Base score range from ML model</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>ML Confidence:</strong> Positions score within range</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>SHG Membership:</strong> +25 points (community trust)</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-gov-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>Business Experience:</strong> +15 to +30 points</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><strong>High EMI Ratio:</strong> -40 to -250 points penalty</span>
                                </li>
                            </ul>
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                    <strong>Formula:</strong> Base Score ± Business Rules ± EMI Penalties
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-12">Key Benefits</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Target, title: 'Fair & Inclusive', desc: 'No discrimination based on lack of formal credit history' },
                            { icon: TrendingUp, title: 'Scalable', desc: 'Process thousands of applications in seconds' },
                            { icon: CheckCircle2, title: 'Transparent', desc: 'Every decision comes with clear reason codes' },
                            { icon: Activity, title: 'Accurate', desc: '85%+ accuracy in predicting repayment behavior' },
                        ].map((benefit, index) => (
                            <div key={index} className="card text-center">
                                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-gov-blue-600" />
                                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                <p className="text-gray-600 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {}
            <section className="gradient-bg text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        See It in Action
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Try our interactive demo to understand how the scoring works
                    </p>
                    <a href="/demo" className="btn-primary bg-white text-gov-blue-600 hover:bg-gray-100">
                        Try the Demo
                    </a>
                </div>
            </section>
        </div>
    );
};
export default SolutionPage;
