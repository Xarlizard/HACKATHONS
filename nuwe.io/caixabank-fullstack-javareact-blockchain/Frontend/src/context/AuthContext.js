import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserSession, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await checkUserSession();
        if (response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Session verification failed:', error);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
