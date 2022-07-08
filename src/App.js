import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { TopNav } from './components/TopNav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Category } from './components/pages/Category';
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <TopNav />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
