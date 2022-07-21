import React, { useEffect} from 'react'
import {  Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { Category } from '../components/pages/category/Category';
import { Product } from '../components/pages/Product';
import { Login } from '../components/pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import {useUser} from '../context/UserContext';
import { PublicRoute } from './PublicRoute';
import Spinner from 'react-bootstrap/Spinner';
import {token} from '../helpers/auth';
export const AppRoute = () => {
  const {verifyToken,setIsLogged,setUser,isLogged} = useUser();
  useEffect(() => {
    console.log('AppRoute has been rendered');
    console.log('IsLogged in AppRoute is: '+isLogged);
    verifyToken().then((response) => {
      if(response.status === 200){
        setIsLogged(true);
        setUser(response.data);
        console.log('token verified');
      }
      else{
        setIsLogged(false);
        setUser({});
        console.log('token not verified');
      }
    }
    ).catch((error) => {
      console.log('Token not verified');
      setIsLogged(false);
    })
  }, [setIsLogged,setUser,verifyToken,isLogged]);
  if(token.get()) {
    if(!isLogged){
      return <Spinner animation="border" variant="primary" />
    }
  }
  return (
    <Routes>
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/Category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/Product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
        <Route path="/Login" element={<PublicRoute><Login /></PublicRoute>} />
    </Routes>
  )
}
