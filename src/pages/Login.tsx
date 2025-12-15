import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login(username, password); // agora usa username
    navigate("/");
  } catch {
    alert("Login failed");
  }
};


  return (
    <form onSubmit={handleLogin} className="form">
      <input type="username" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
