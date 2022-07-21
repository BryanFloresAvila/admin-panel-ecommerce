import { useUser } from '../context/UserContext';
import { Navigate,useLocation } from 'react-router-dom';
export const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const {isLogged} = useUser();
    
    console.log('isLogged: '+isLogged +' location: '+location.pathname);
    if(!isLogged) {
        return <Navigate to="/Login" />
    }
    return children;
}
