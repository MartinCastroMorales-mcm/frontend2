import { useAuth, AuthContextType } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

type proptype = {
    children : ReactNode,
    allowedRoles: number[] 
}

const ProtectedRoute = ({ children, allowedRoles }: proptype) => {
    console.log("hello there");
    const authContextType : AuthContextType | undefined = useAuth();
    if(authContextType == undefined) {
        console.log("FAILURE authContextType is null");
        return null;
    }
    const { isAuthenticated, user } : AuthContextType = authContextType;
    
    if (!isAuthenticated) {
        return <Navigate to="/auth" />;
    }

    if(user === null) {
        console.log("FAILURE user is null");
        return null;
    }
    console.log("user")
    console.log(user)
    console.log("allowedRoles")
    console.log(allowedRoles)
    if (allowedRoles && !allowedRoles.includes(user.rol_usuario)) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;