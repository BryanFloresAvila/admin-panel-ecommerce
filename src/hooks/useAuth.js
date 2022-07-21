import { useState,useCallback } from 'react';
import { token } from '../helpers/auth';
import axios from 'axios';
export const useAuth = () => {
    const [user, setUser] = useState( () => {});
    const [isLogged, setIsLogged] = useState(false);
    const login =  (email, password) => {
      const data = { email, password };
      const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/auth/login';
      axios.post(URL, data)
        .then((response)=> {
          if(response.status === 200) {
            if(response.data.user.rol === 'admin') {
              setUser(response.data);
              setIsLogged(true);
              token.set(response.data.token);
            }
            else{
              throw new Error('You are not an admin');
            }
          }
        })
        .catch((error) => {
          if(error.code) console.log(error.response.data.message);
          else console.log(error.message);
        })

    }

    const logout = () => {
        setUser({});
        token.remove();
      };
    
    const verifyToken =  useCallback(() => {
      const URL = 'https://backend-project-pam-production.up.railway.app/api/v1/auth/verifyTokenAdmin';
      const tokenStorage = token.get() ? token.get() : null;
      if(tokenStorage!=null) {
        return axios.post(URL,{},
          {
            headers: { Authorization: `Bearer ${tokenStorage}` }
          })
          
          }
    },[])
      return {user,isLogged,setUser,setIsLogged, login, logout, verifyToken};
}
