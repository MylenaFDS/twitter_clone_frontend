import { Link } from "react-router-dom";
import "../styles/layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">𝕏</h2>

      <nav className="sidebar-menu">
        <Link to="/feed">🏠 <span>Home</span></Link>
        <Link to="/profile">👤 <span>Perfil</span></Link>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem("token")}
        >
          🚪 <span>Sair</span>
        </Link>
      </nav>
    </aside>
  );
}

