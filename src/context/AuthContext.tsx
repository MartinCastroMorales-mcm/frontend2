import { createContext, useContext, useEffect, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';
import usuario from '../model/Usuario'

export type AuthContextType = {
    isAuthenticated: boolean
    user: usuario | null //change
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

//children es de tipo ReactNode
export function AuthProvider({ children } : {children : ReactNode}) {
    const navigate = useNavigate();
    const userData = sessionStorage.getItem('usuario');
    //Si los datos no son nulos hacer el json parse, si no el usuario es nulo
    const user : usuario | null = userData ? JSON.parse(userData): null;
    //si el usuario es nulo no esta autentificado
    const isAuthenticated = user ? true : false;

useEffect(() => {
    if (!isAuthenticated) {
        navigate('/auth');
    }
}, [isAuthenticated, navigate]);

return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
        {children}
    </AuthContext.Provider>
);
}