import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{useEffect}from 'react';
import { TopNav } from './components/TopNav';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/Footer';
import { UserProvider } from './context/UserContext';
import {AppRoute} from './router/AppRoute';

export const App = () => {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <TopNav />
          <AppRoute/>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
