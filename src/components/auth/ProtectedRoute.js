// ===== frontend/src/components/auth/ProtectedRoute.js =====
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return children;
};

export default ProtectedRoute;