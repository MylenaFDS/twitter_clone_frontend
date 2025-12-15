import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await api.post("/token/", {
      username,
      password,
    });

    localStorage.setItem("token", response.data.access);
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button>Entrar</button>
    </form>
  );
}
