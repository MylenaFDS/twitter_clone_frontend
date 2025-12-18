import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      await api.post("/register/", {
        username,
        email,
        password,
      });

      navigate("/login");
    } catch  {
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button>Cadastrar</button>
    </form>
  );
}
