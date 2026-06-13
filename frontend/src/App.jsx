import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import PatientDashboard from './pages/patient/Dashboard';
import PatientProgress from './pages/patient/Progress';
import NutritionistDashboard from './pages/nutritionist/Dashboard';
import PatientDetail from './pages/nutritionist/PatientDetail';
import PlanEditor from './pages/nutritionist/PlanEditor';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Patient Routes */}
          <Route 
            path="/patient" 
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/patient/progress" 
            element={
              <ProtectedRoute role="patient">
                <PatientProgress />
              </ProtectedRoute>
            } 
          />

          {/* Nutritionist Routes */}
          <Route 
            path="/nutritionist" 
            element={
              <ProtectedRoute role="nutritionist">
                <NutritionistDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/patients/:id" 
            element={
              <ProtectedRoute role="nutritionist">
                <PatientDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/patients/:id/plan" 
            element={
              <ProtectedRoute role="nutritionist">
                <PlanEditor />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
