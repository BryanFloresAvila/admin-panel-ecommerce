import React, { useEffect } from 'react';
import { useAuth } from '../../store/context/authContext';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  const { state } = useAuth();
  const { user, isLogged } = state;
  console.log('isLogged: ' + isLogged + ' user: ' + user);
  return (
    <div className="container">
      <h3>Hello {user.name}</h3>
    </div>
  );
};
