import { apiPublic,apiPrivateF} from "../axios";
import { token } from '../../../utils/auth';

export const login = (email, password) => {
    return apiPublic.post("/auth/login", { email, password });
}

export const verifyToken = () => {
    return apiPrivateF(token.get()).post("/auth/verifyTokenAdmin");
}