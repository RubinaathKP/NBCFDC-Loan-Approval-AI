import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, Users, BarChart3, CheckCircle } from 'lucide-react';
const HomePage = () => {
    return (
        <div className="animate-fade-in">
            {}
            <section className="gradient-bg text-white py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
                            AI-Assisted Credit Scoring
                            <br />
                            <span className="text-gov-orange-500">for NBCFDC Beneficiaries</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                            Empowering informal economy borrowers with fair, transparent,
                            and AI-driven credit assessment
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/demo" className="btn-primary bg-white text-gov-blue-600 hover:bg-gray-100">
                                Try the Demo
                                <ArrowRight className="inline ml-2" size={20} />
                            </Link>
                            <Link to="/solution" className="btn-primary border-white text-white hover:bg-white/10">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Users, value: '10M+', label: 'Beneficiaries Served' },
                            { icon: TrendingUp, value: '85%', label: 'Accuracy Rate' },
                            { icon: Shield, value: '100%', label: 'Data Privacy' },
                            { icon: Zap, value: '<5 sec', label: 'Processing Time' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center card-hover">
                                <stat.icon className="w-12 h-12 mx-auto mb-4 text-gov-blue-600" />
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Comprehensive Credit Scoring</h2>
                        <p className="section-subtitle">
                            Tailored solutions for both Individuals and MSME Enterprises
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {}
                        <div className="card">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <BarChart3 className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Individual Benefits</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Uses occupation, stability, and family structure to score informal workers without credit history.
                            </p>
                        </div>
                        {}
                        <div className="card bg-blue-50 border border-blue-100">
                            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-blue-900">MSME Loans</h3>
                            <p className="text-gray-700 leading-relaxed">
                                Specialized scoring for businesses using turnover, GST compliance, and asset strength.
                            </p>
                            <Link to="/msme" className="mt-4 inline-flex items-center text-blue-700 font-semibold hover:text-blue-900">
                                Try MSME Score <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                        </div>
                        {}
                        <div className="card">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Policy-Aligned</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Designed to align with NBCFDC's mission of financial inclusion for backward classes.
                            </p>
                        </div>
                        {/* Feature 4 */}
                        <div className="card">
                            <div className="w-16 h-16 bg-gov-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-gov-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Explainable AI</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every decision comes with clear reason codes, ensuring transparency and trust.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Simple, fast, and transparent credit assessment
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: 'Enter Information',
                                description: 'Provide basic details about occupation, business, and family'
                            },
                            {
                                step: '02',
                                title: 'AI Analysis',
                                description: 'Our engine calculates income, repayment discipline, and risk'
                            },
                            {
                                step: '03',
                                title: 'Get Results',
                                description: 'Receive a 200-900 credit score with detailed explanations'
                            }
                        ].map((item, index) => (
                            <div key={index} className="relative">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-gov-blue-100 mb-4">{item.step}</div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2">
                                        <ArrowRight className="text-gov-blue-300" size={32} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link to="/demo" className="btn-primary">
                            Try It Now
                            <ArrowRight className="inline ml-2" size={20} />
                        </Link>
                    </div>
                </div>
            </section>
            {}
            <section className="gradient-bg text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Experience Fair Credit Scoring?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of beneficiaries who have accessed fair credit assessment
                    </p>
                    <Link to="/demo" className="btn-primary bg-white text-gov-blue-600 hover:bg-gray-100">
                        Get Started
                        <ArrowRight className="inline ml-2" size={20} />
                    </Link>
                </div>
            </section>
        </div>
    );
};
export default HomePage;
