import React from 'react';
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {}
                    <div>
                        <h3 className="text-lg font-bold mb-4">About NBCFDC</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            National Backward Classes Finance & Development Corporation empowers
                            backward classes through financial assistance and skill development programs.
                        </p>
                    </div>
                    {}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="https://nbcfdc.gov.in" target="_blank" rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors">
                                    Official Website
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Loan Schemes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Apply for Loan
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    {}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>5th Floor, NCUI Building</li>
                            <li>3, Siri Institutional Area</li>
                            <li>August Kranti Marg, New Delhi - 110016</li>
                            <li className="pt-2">
                                <a href="tel:01126963331" className="hover:text-white transition-colors">
                                    Phone: 011-26963331
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>© 2026 NBCFDC AI Credit Scoring System. All rights reserved.</p>
                    <p className="mt-2">
                        Developed for empowering informal economy borrowers with fair credit assessment.
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
