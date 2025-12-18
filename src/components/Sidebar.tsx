import { Link } from "react-router-dom";
import "../styles/layout.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="logo">𝕏</h2>

      <Link to="/">🏠 Home</Link>
      <Link to="/profile">👤 Perfil</Link>
      <Link to="/login" onClick={() => localStorage.removeItem("token")}>
        🚪 Sair
      </Link>
    </nav>
  );
}
