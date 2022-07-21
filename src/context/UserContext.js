import React, {  useContext, createContext } from 'react';
import {useAuth} from '../hooks/useAuth';

const UserContext = createContext({});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const { user, isLogged, setIsLogged,setUser, login, logout, verifyToken } = useAuth();

  return (
    <UserContext.Provider value={{ user,setUser, setIsLogged,isLogged, verifyToken, login, logout }}>
        {children}
    </UserContext.Provider>
  );
};
