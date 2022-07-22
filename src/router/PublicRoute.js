import React from 'react';
import { useAuth } from '../store/context/authContext';
import { Navigate } from 'react-router-dom';
export const PublicRoute = ({ children }) => {
  const { state } = useAuth();
  const { isLogged } = state;
  if (isLogged) {
    return <Navigate to="/Home" />;
  }
  return children;
};
