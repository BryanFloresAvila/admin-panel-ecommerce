import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../store/context/authContext';
export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { state } = useAuth();
  const { isLogged } = state;
  if (!isLogged) {
    return <Navigate to="/Login" />;
  }
  return children;
};
