import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Category } from '../components/pages/category/Category';
import { Product } from '../components/pages/Product';
import { Login } from '../components/pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { useAuth } from '../store/context/authContext';
import { verifyToken as verifyTokenF } from '../store/actions/actions';
import Spinner from 'react-bootstrap/Spinner';

export const AppRoute = () => {
  const { state, dispatch } = useAuth();
  const { loadingVerifyToken } = state;

  useEffect(() => {
    verifyTokenF(dispatch);
  }, [dispatch]);

  if (loadingVerifyToken) {
    return <Spinner animation="border" variant="primary" />;
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Product"
        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
