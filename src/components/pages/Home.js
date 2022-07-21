import React,{useEffect} from 'react';
import {useUser} from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  console.log('Home has been rendered');
  const {user,isLogged} = useUser();
  return (
    <div className="container">
      <h3>Hello {user.name} </h3>
    </div>
  );
};
