import React from 'react';
import { AlertCircle, TrendingDown, Users, FileX, DollarSign } from 'lucide-react';
const ProblemPage = () => {
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">The Problem</h1>
                    <p className="text-xl text-red-100">
                        Why traditional credit scoring fails the informal economy
                    </p>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="card bg-red-50 border-l-4 border-red-600">
                        <div className="flex items-start space-x-4">
                            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    60% of India's Workforce is Invisible to Traditional Credit Systems
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    Over 400 million Indians work in the informal economy—as tailors, street vendors,
                                    auto drivers, and small shop owners. Despite being hardworking and creditworthy,
                                    they are systematically excluded from formal credit because they lack the
                                    documentation that traditional banks require.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Key Challenges */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-12">Key Challenges</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Challenge 1 */}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileX className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">No Credit History</h3>
                                    <p className="text-gray-600">
                                        Informal workers have no bank statements, tax returns, or credit scores.
                                        Traditional CIBIL-based systems automatically reject them.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Challenge 2 */}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <DollarSign className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Irregular Income</h3>
                                    <p className="text-gray-600">
                                        Daily wage workers and seasonal businesses have fluctuating incomes
                                        that don't fit traditional salary-based assessment models.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Social Exclusion</h3>
                                    <p className="text-gray-600">
                                        Backward classes and marginalized communities face additional barriers
                                        due to lack of collateral and formal business registration.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {}
                        <div className="card">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <TrendingDown className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">High Rejection Rates</h3>
                                    <p className="text-gray-600">
                                        Over 70% of loan applications from informal workers are rejected,
                                        forcing them into predatory lending at 36-60% annual interest.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-12">
                        Challenges in NBCFDC Lending
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">45%</div>
                            <div className="text-gray-600 font-semibold mb-2">Default Rate</div>
                            <p className="text-sm text-gray-500">
                                Without proper risk assessment, loan defaults remain high
                            </p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">2-3 weeks</div>
                            <div className="text-gray-600 font-semibold mb-2">Processing Time</div>
                            <p className="text-sm text-gray-500">
                                Manual verification delays disbursement and frustrates borrowers
                            </p>
                        </div>
                        <div className="card text-center">
                            <div className="text-4xl font-bold text-red-600 mb-2">Limited</div>
                            <div className="text-gray-600 font-semibold mb-2">Scalability</div>
                            <p className="text-sm text-gray-500">
                                Human-based assessment can't scale to millions of beneficiaries
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Impact Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-8">The Real-World Impact</h2>
                    <div className="space-y-6">
                        <div className="card bg-white border-l-4 border-red-600">
                            <p className="text-gray-700 italic text-lg leading-relaxed">
                                "I've been a tailor for 15 years, but banks won't give me a loan because
                                I don't have a salary slip. I had to borrow from a local moneylender at
                                48% interest just to buy a new sewing machine."
                            </p>
                            <p className="text-gray-500 mt-3">— Ramesh, Tailor from Bihar</p>
                        </div>
                        <div className="card bg-white border-l-4 border-red-600">
                            <p className="text-gray-700 italic text-lg leading-relaxed">
                                "My vegetable business makes ₹12,000 per month, but it's all cash.
                                Without bank statements, I'm considered 'high risk' even though I've
                                never missed a payment in my life."
                            </p>
                            <p className="text-gray-500 mt-3">— Lakshmi, Street Vendor from Tamil Nadu</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Call to Action */}
            <section className="gradient-bg text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        There Has to Be a Better Way
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Our AI-powered solution is designed specifically to solve these challenges
                    </p>
                    <a href="/solution" className="btn-primary bg-white text-gov-blue-600 hover:bg-gray-100">
                        See Our Solution
                    </a>
                </div>
            </section>
        </div>
    );
};
export default ProblemPage;
