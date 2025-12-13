import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e8f5f7 0%, #fef3e8 100%)'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid rgba(158, 229, 213, 0.3)',
          borderTopColor: '#9ee5d5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  // Check if admin access is required
  if (adminOnly && !isAdmin()) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e8f5f7 0%, #fef3e8 100%)',
        fontFamily: 'Raleway, sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚫</div>
        <h1 style={{ 
          fontSize: '32px', 
          color: '#2c3e50', 
          marginBottom: '12px',
          fontFamily: 'Playfair Display, serif'
        }}>
          Access Denied
        </h1>
        <p style={{ fontSize: '16px', color: '#7f8c9a', marginBottom: '24px' }}>
          You don't have permission to access this page.
        </p>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '12px 32px',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(135deg, #f4c96b 0%, #ffa94d 100%)',
            color: 'white',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(244, 201, 107, 0.4)',
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;