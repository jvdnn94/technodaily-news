// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // بررسی اولیه وضعیت لاگین از localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  // تابع ورود
  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  // تابع خروج
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوک سفارشی برای استفاده آسان
export const useAuth = () => useContext(AuthContext);