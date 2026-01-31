import React from 'react';
import { Github, Linkedin, Mail, Users } from 'lucide-react';
const TeamPage = () => {
    const teamMembers = [
        {
            name: 'Dr. Priya Sharma',
            role: 'Lead AI Researcher',
            bio: 'PhD in Machine Learning from IIT Delhi. 10+ years in financial inclusion AI.',
            image: '👩‍💼',
            linkedin: '#',
            github: '#',
            email: 'priya.sharma@nbcfdc.ai'
        },
        {
            name: 'Rajesh Kumar',
            role: 'Backend Engineer',
            bio: 'Expert in Python, Flask, and scalable API development for fintech.',
            image: '👨‍💻',
            linkedin: '#',
            github: '#',
            email: 'rajesh.kumar@nbcfdc.ai'
        },
        {
            name: 'Ananya Patel',
            role: 'Frontend Developer',
            bio: 'Specialist in React, UX design, and accessible government web applications.',
            image: '👩‍💻',
            linkedin: '#',
            github: '#',
            email: 'ananya.patel@nbcfdc.ai'
        },
        {
            name: 'Vikram Singh',
            role: 'Data Scientist',
            bio: 'Expert in credit risk modeling and informal economy analytics.',
            image: '👨‍🔬',
            linkedin: '#',
            github: '#',
            email: 'vikram.singh@nbcfdc.ai'
        },
        {
            name: 'Meera Reddy',
            role: 'Policy Advisor',
            bio: 'Former NBCFDC officer with 15 years in microfinance and policy.',
            image: '👩‍⚖️',
            linkedin: '#',
            github: '#',
            email: 'meera.reddy@nbcfdc.ai'
        },
        {
            name: 'Arjun Mehta',
            role: 'DevOps Engineer',
            bio: 'Cloud infrastructure specialist ensuring 99.9% uptime and security.',
            image: '👨‍🔧',
            linkedin: '#',
            github: '#',
            email: 'arjun.mehta@nbcfdc.ai'
        },
    ];
    return (
        <div className="animate-fade-in">
            {}
            <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Users className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
                        <p className="text-xl text-indigo-100">
                            Passionate experts working to democratize credit access
                        </p>
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        We are a multidisciplinary team of AI researchers, engineers, data scientists,
                        and policy experts united by a common goal: to make credit accessible to the
                        400 million Indians in the informal economy who have been left behind by
                        traditional banking systems.
                    </p>
                </div>
            </section>
            {}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="card-hover bg-white">
                                {}
                                <div className="text-center mb-4">
                                    <div className="text-6xl mb-3">{member.image}</div>
                                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-gov-blue-600 font-semibold">{member.role}</p>
                                </div>
                                {}
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    {member.bio}
                                </p>
                                {}
                                <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200">
                                    <a
                                        href={member.linkedin}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gov-blue-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                                        aria-label="LinkedIn"
                                    >
                                        <Linkedin size={18} />
                                    </a>
                                    <a
                                        href={member.github}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                                        aria-label="GitHub"
                                    >
                                        <Github size={18} />
                                    </a>
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="w-10 h-10 bg-gray-100 hover:bg-gov-blue-600 hover:text-white rounded-full flex items-center justify-center transition-all duration-200"
                                        aria-label="Email"
                                    >
                                        <Mail size={18} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-title text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { title: 'Inclusion', desc: 'Credit for all, regardless of background' },
                            { title: 'Transparency', desc: 'Explainable AI decisions, no black boxes' },
                            { title: 'Fairness', desc: 'Unbiased algorithms that serve everyone' },
                            { title: 'Impact', desc: 'Measurable improvement in lives' },
                        ].map((value, index) => (
                            <div key={index} className="card text-center">
                                <h3 className="text-xl font-bold text-gov-blue-600 mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {}
            <section className="gradient-bg text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Want to Collaborate?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        We're always looking for partners, researchers, and organizations
                        committed to financial inclusion
                    </p>
                    <a href="mailto:contact@nbcfdc.ai" className="btn-primary bg-white text-gov-blue-600 hover:bg-gray-100">
                        <Mail className="inline mr-2" size={20} />
                        Get in Touch
                    </a>
                </div>
            </section>
        </div>
    );
};
export default TeamPage;
