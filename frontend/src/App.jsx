import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Component to handle root redirect
function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

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

  return <Navigate to={isAuthenticated() ? "/dashboard" : "/auth"} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          {/* 404 - Not Found */}
          <Route
            path="*"
            element={
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                  background: 'linear-gradient(135deg, #e8f5f7 0%, #fef3e8 100%)',
                  fontFamily: 'Raleway, sans-serif',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '120px', marginBottom: '20px' }}>🍬</div>
                <h1
                  style={{
                    fontSize: '48px',
                    color: '#2c3e50',
                    marginBottom: '12px',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  404
                </h1>
                <p style={{ fontSize: '18px', color: '#7f8c9a', marginBottom: '32px' }}>
                  Oops! This sweet doesn't exist.
                </p>
                <a
                  href="/"
                  style={{
                    padding: '14px 36px',
                    borderRadius: '50px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #f4c96b 0%, #ffa94d 100%)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(244, 201, 107, 0.4)',
                  }}
                >
                  Back to Sweet Shop
                </a>
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;