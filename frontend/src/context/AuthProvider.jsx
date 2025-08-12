import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state by reading from localStorage. This runs only once on initial load.
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  // This effect runs whenever the 'user' state changes.
  useEffect(() => {
    if (user) {
      // If user logs in, save their data to localStorage.
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      // If user logs out, remove their data from localStorage.
      localStorage.removeItem('user');
    }
  }, [user]); // The dependency array ensures this effect runs only when 'user' changes.

  const login = (userData) => {
    console.log("AuthProvider login function called with:", userData);
    // Set the user state. The useEffect above will handle saving it to localStorage.
    setUser(userData);
  };

  const logout = () => {
    // Clear the user state. The useEffect will handle removing it from localStorage.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
