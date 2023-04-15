import React, { useState } from "react";
import jwt from 'jwt-decode';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    const getToken = () => {
        return localStorage.getItem('authToken');
    }

    const getUser = () => {
        if (user)
            return user;
        else {
            const decodedToken = jwt(getToken());
            setUser(decodedToken);
            return decodedToken;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isLoading,
                user,
                storeToken,
                getToken,
                getUser,
            }}
        >
            {props.children}
        </AuthContext.Provider >
    )
}

export { AuthProviderWrapper, AuthContext };
