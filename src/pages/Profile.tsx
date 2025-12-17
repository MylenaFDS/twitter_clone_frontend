import { useEffect, useState } from "react";
import api from "../services/api";

interface ProfileResponse {
  username: string;
  email: string;
}

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get<ProfileResponse>("/profile/");
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError("Erro ao carregar perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      await api.put("/profile/", {
        username,
        email,
      });
      alert("Perfil atualizado com sucesso");
    } catch (err) {
      setError("Erro ao atualizar perfil");
      console.error(err);
    }
  }

  if (loading) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <form onSubmit={handleUpdate} className="form">
      <h2>Meu perfil</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Atualizar perfil</button>
    </form>
  );
}


