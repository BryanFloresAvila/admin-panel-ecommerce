import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { TopNav } from './components/TopNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Category } from './components/pages/category/Category';
import { Product } from './components/pages/Product';
import { Login } from './components/pages/Login';
import { Footer } from './components/Footer';
import { UserProvider } from './context/UserContext';
export const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <TopNav />
          <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
