import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { TopNav } from './components/TopNav';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/Footer';
import { AuthProvider } from './store/context/authContext';
import { ProductProvider } from './store/context/productContext';
import { CategoryProvider } from './store/context/categoryContext';
import { AppRoute } from './router/AppRoute';

export const App = () => {
  return (
    <>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
            <BrowserRouter>
              <TopNav />
              <AppRoute />
              <Footer />
            </BrowserRouter>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
};
