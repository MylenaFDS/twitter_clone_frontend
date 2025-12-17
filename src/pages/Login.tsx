import { useState } from "react";
import "../styles/auth.css";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);

      // força re-render do App.tsx
      window.location.href = "/";
    } catch (err) {
      setError("Usuário ou senha inválidos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-box">
        <h1>Entrar no Twitter</h1>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
