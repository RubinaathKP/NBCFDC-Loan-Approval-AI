import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Lightbulb, FlaskConical, Database, Users, Building2 } from 'lucide-react';
const Navbar = () => {
    const location = useLocation();
    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/problem', label: 'Problem', icon: FileText },
        { path: '/solution', label: 'Solution', icon: Lightbulb },
        { path: '/demo', label: 'Beneficiary', icon: FlaskConical },
        { path: '/msme', label: 'MSME', icon: Building2 },
        { path: '/dataset', label: 'Dataset', icon: Database },
        { path: '/team', label: 'Team', icon: Users },
    ];
    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {}
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-gov-blue-600 to-gov-blue-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">N</span>
                        </div>
                        <span className="font-bold text-xl text-gray-900 hidden md:block">
                            NBCFDC Credit Scoring
                        </span>
                    </Link>
                    {}
                    <div className="flex space-x-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gov-blue-600 text-white'
                                        : 'text-gray-700 hover:bg-gov-blue-50 hover:text-gov-blue-600'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="hidden sm:inline font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
