import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPage({ initialMode }) {

  const [isLogin, setIsLogin] = useState(initialMode === "login");

  
  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      {isLogin ? (
        <LoginForm onSwitch={toggleForm} />
      ) : (
        <RegisterForm onSwitch={toggleForm} />
      )}
    </div>
  );
}