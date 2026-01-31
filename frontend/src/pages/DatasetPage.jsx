import React from 'react';
import { Download, Database, FileSpreadsheet } from 'lucide-react';
const DatasetPage = () => {
    const sampleData = [
        { id: 1, age: 38, occupation: 'Tailor', business_years: 6, asset_score: 1, dependents: 2, shg_member: 'Yes', proposed_emi: 2500, first_time: 'Yes', risk: 'Low' },
        { id: 2, age: 45, occupation: 'Auto Driver', business_years: 12, asset_score: 2, dependents: 3, shg_member: 'No', proposed_emi: 3500, first_time: 'No', risk: 'Low' },
        { id: 3, age: 28, occupation: 'Street Vendor', business_years: 2, asset_score: 0, dependents: 1, shg_member: 'Yes', proposed_emi: 1500, first_time: 'Yes', risk: 'Medium' },
        { id: 4, age: 52, occupation: 'Small Shop Owner', business_years: 15, asset_score: 3, dependents: 4, shg_member: 'Yes', proposed_emi: 4000, first_time: 'No', risk: 'Low' },
        { id: 5, age: 31, occupation: 'Carpenter', business_years: 8, asset_score: 2, dependents: 2, shg_member: 'No', proposed_emi: 2800, first_time: 'Yes', risk: 'Medium' },
        { id: 6, occupation: 'Domestic Worker', age: 42, business_years: 5, asset_score: 0, dependents: 3, shg_member: 'Yes', proposed_emi: 1200, first_time: 'Yes', risk: 'Medium' },
        { id: 7, age: 36, occupation: 'Electrician', business_years: 10, asset_score: 2, dependents: 2, shg_member: 'No', proposed_emi: 3200, first_time: 'No', risk: 'Low' },
        { id: 8, age: 29, occupation: 'Beautician', business_years: 4, asset_score: 1, dependents: 1, shg_member: 'Yes', proposed_emi: 2000, first_time: 'Yes', risk: 'Medium' },
        { id: 9, age: 48, occupation: 'Mason', business_years: 18, asset_score: 2, dependents: 4, shg_member: 'No', proposed_emi: 3500, first_time: 'No', risk: 'Low' },
        { id: 10, age: 33, occupation: 'Vegetable Seller', business_years: 7, asset_score: 1, dependents: 2, shg_member: 'Yes', proposed_emi: 1800, first_time: 'Yes', risk: 'Low' },
    ];
    const downloadCSV = () => {
        const headers = ['ID', 'Age', 'Occupation', 'Business Years', 'Asset Score', 'Dependents', 'SHG Member', 'Proposed EMI', 'First Time Borrower', 'Risk Bucket'];
        const csvContent = [
            headers.join(','),
            ...sampleData.map(row =>
                `${row.id},${row.age},${row.occupation},${row.business_years},${row.asset_score},${row.dependents},${row.shg_member},${row.proposed_emi},${row.first_time},${row.risk}`
            )
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nbcfdc_sample_dataset.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Sample Dataset</h1>
                    <p className="text-xl text-purple-100">
                        Synthetic data for testing and demonstration purposes
                    </p>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="card text-center">
                            <Database className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                            <div className="text-3xl font-bold text-gray-900 mb-1">1,000+</div>
                            <div className="text-gray-600">Sample Records</div>
                        </div>
                        <div className="card text-center">
                            <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                            <div className="text-3xl font-bold text-gray-900 mb-1">9</div>
                            <div className="text-gray-600">Data Fields</div>
                        </div>
                        <div className="card text-center">
                            <Download className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                            <div className="text-3xl font-bold text-gray-900 mb-1">CSV</div>
                            <div className="text-gray-600">Format</div>
                        </div>
                    </div>
                    <div className="card bg-purple-50 mb-8">
                        <h3 className="text-xl font-bold mb-3">About This Dataset</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            This is a <strong>synthetic dataset</strong> created to demonstrate the NBCFDC credit
                            scoring system. It contains realistic profiles of informal economy workers across
                            various occupations, with diverse income levels, family structures, and business histories.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>Note:</strong> All data is artificially generated and does not represent real individuals.
                            It is designed to reflect the demographic and economic characteristics of NBCFDC beneficiaries.
                        </p>
                    </div>
                    {}
                    <div className="text-center mb-12">
                        <button onClick={downloadCSV} className="btn-primary">
                            <Download className="inline mr-2" size={20} />
                            Download Sample Dataset (CSV)
                        </button>
                    </div>
                    {}
                    <div className="card">
                        <h3 className="text-xl font-bold mb-4">Sample Records (First 10 rows)</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-3 text-left font-semibold">ID</th>
                                        <th className="p-3 text-left font-semibold">Age</th>
                                        <th className="p-3 text-left font-semibold">Occupation</th>
                                        <th className="p-3 text-left font-semibold">Bus. Years</th>
                                        <th className="p-3 text-left font-semibold">Assets</th>
                                        <th className="p-3 text-left font-semibold">Deps</th>
                                        <th className="p-3 text-left font-semibold">SHG</th>
                                        <th className="p-3 text-left font-semibold">EMI</th>
                                        <th className="p-3 text-left font-semibold">First Time</th>
                                        <th className="p-3 text-left font-semibold">Risk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sampleData.map((row, index) => (
                                        <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="p-3">{row.id}</td>
                                            <td className="p-3">{row.age}</td>
                                            <td className="p-3">{row.occupation}</td>
                                            <td className="p-3">{row.business_years}</td>
                                            <td className="p-3">{row.asset_score}</td>
                                            <td className="p-3">{row.dependents}</td>
                                            <td className="p-3">{row.shg_member}</td>
                                            <td className="p-3">₹{row.proposed_emi}</td>
                                            <td className="p-3">{row.first_time}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.risk === 'Low' ? 'bg-green-100 text-green-800' :
                                                    row.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {row.risk}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {}
                    <div className="mt-8 card">
                        <h3 className="text-xl font-bold mb-4">Data Fields Description</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { field: 'Age', desc: 'Applicant age (18-100 years)' },
                                { field: 'Occupation', desc: '20 informal economy occupations' },
                                { field: 'Business Years', desc: 'Years of experience in occupation' },
                                { field: 'Asset Score', desc: '0-3 scale (0=none, 3=good assets)' },
                                { field: 'Dependents', desc: 'Number of family dependents' },
                                { field: 'SHG Member', desc: 'Self-Help Group membership (Yes/No)' },
                                { field: 'Proposed EMI', desc: 'Monthly loan repayment amount (₹)' },
                                { field: 'First Time Borrower', desc: 'First-time loan applicant (Yes/No)' },
                                { field: 'Risk Bucket', desc: 'AI risk assessment (Low/Medium/High) + 200-900 credit score' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <span className="font-semibold text-gray-900">{item.field}:</span>
                                        <span className="text-gray-600 ml-1">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default DatasetPage;
