// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context for Authentication
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(""); // role: 'admin', 'user'

  const login = (email, password, role) => {
    // For now, you can validate against hardcoded values or an API
    if (email === "khushi@gmail.com" && password === "0000") {
      setIsAuthenticated(true);
      setRole(role);
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, role }));
    } else {
      alert("Invalid credentials!");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
    localStorage.removeItem('auth');
  };

  // Check if the user is already logged in
  React.useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { isAuthenticated, role } = JSON.parse(storedAuth);
      setIsAuthenticated(isAuthenticated);
      setRole(role);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
