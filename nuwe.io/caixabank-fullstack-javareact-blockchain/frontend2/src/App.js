import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { AuthView } from './components/AuthView';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { TradingView } from './components/TradingView';
import { useAuth } from './hooks/useAuth';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

// App wrapper to use auth context
const AppContent = () => {
    const { user } = useAuth();

    return (
        <>
            {user && <Navbar />}
            <Routes>
                <Route path="/" element={!user ? <AuthView /> : <Navigate to="/dashboard" />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <MarketProvider>
                                <DashboardView />
                            </MarketProvider>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/trade/:symbol"
                    element={
                        <ProtectedRoute>
                            <MarketProvider>
                                <TradingView />
                            </MarketProvider>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
};

export default App;
