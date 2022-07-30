import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/context/authContext';
export const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  const { isLogged } = state;
  if (!isLogged) {
    return <Navigate to="/Login" />;
  }
  return children;
};
