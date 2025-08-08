import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // In a real app, you'd initialize this from localStorage
    const [user, setUser] = useState(null); 

    // login function would call your API, get a token, decode it, and setUser
    const login = (userData) => {
        // This is where you'd set the user data after a successful API call
        setUser({ role: userData.role, name: userData.username }); 
        localStorage.setItem('authToken', userData.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);