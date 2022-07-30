import React from 'react';
import { useAuth } from '../../store/context/authContext';

export const Home = () => {
  const { state } = useAuth();
  const { user, isLogged } = state;
  console.log('isLogged: ' + isLogged + ' user: ' + user);
  return (
    <div className="container">
      <h3 className="text-center">Hello {user.name}</h3>
    </div>
  );
};
