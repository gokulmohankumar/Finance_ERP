import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to the /login page
    return <Navigate to="/login" />;
  }

  // If a user is logged in, render the page
  return children;
};

export default ProtectedRoute;