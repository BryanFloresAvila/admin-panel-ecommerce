import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext({});
const UserUpdateContext = createContext({});

export const useUser = () => useContext(UserContext);
export const useUserUpdate = () => useContext(UserUpdateContext);

export const setToken = (token) => {
  localStorage.setItem('token', token);
};
export const getToken = () => {
  return localStorage.getItem('token');
};
export const removeToken = () => {
  localStorage.removeItem('token');
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const login = async (email, password) => {
    try {
      const data = { email, password };
      const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/auth/login';
      const res = await axios.post(URL, data);
      setUser(res.data);
      setToken(res.data.token);

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser({});
    removeToken();
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={{ login, logout }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
