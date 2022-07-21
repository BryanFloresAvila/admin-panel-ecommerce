import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
export const PublicRoute = ({children}) => {
    const {isLogged} = useUser();
    if(isLogged) {
        return <Navigate to="/Home" />
    }
    return children;
}
