import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/ProblemPage';
import SolutionPage from './pages/SolutionPage';
import DemoPage from './pages/DemoPage';
import DatasetPage from './pages/DatasetPage';
import TeamPage from './pages/TeamPage';
import MSMEPage from './pages/MSMEPage';
function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/problem" element={<ProblemPage />} />
                        <Route path="/solution" element={<SolutionPage />} />
                        <Route path="/demo" element={<DemoPage />} />
                        <Route path="/msme" element={<MSMEPage />} />
                        <Route path="/dataset" element={<DatasetPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
export default App;
