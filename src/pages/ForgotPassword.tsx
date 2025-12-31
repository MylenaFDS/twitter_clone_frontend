import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";

const API_BASE_URL = "http://127.0.0.1:9000";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function requestReset() {
    setError("");
    try {
      await axios.post(
        `${API_BASE_URL}/api/password-reset/request/`,
        { username }
      );
      setStep(2);
    } catch {
      setError("Usuário não encontrado");
    }
  }

  async function confirmReset() {
    setError("");
    try {
      await axios.post(
        `${API_BASE_URL}/api/password-reset/confirm/`,
        {
          username,
          new_password: password,
        }
      );
      setMessage("Senha redefinida com sucesso!");
      
    } catch {
      setError("Erro ao redefinir senha");
    } 
  }

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2 className="forgot-title">Esqueceu a senha?</h2>

        {step === 1 && (
          <>
            <input
              className="forgot-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <button className="forgot-button" onClick={requestReset}>
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              className="forgot-input"
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="forgot-button" onClick={confirmReset}>
              Redefinir senha
            </button>
          </>
        )}

        {message && (
          <>
            <p className="forgot-success">{message}</p>
            <button
              className="forgot-link"
              onClick={() => navigate("/login")}
            >
              Voltar para o login
            </button>
          </>
        )}

        {error && <p className="forgot-error">{error}</p>}
      </div>
    </div>
  );
}
