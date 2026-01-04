import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/bottom-bar.css";

export default function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <nav className="bottom-bar">
      <Link
        to="/feed"
        className={location.pathname === "/feed" ? "active" : ""}
      >
        🏠
      </Link>

      <Link
        to="/profile"
        className={location.pathname === "/profile" ? "active" : ""}
      >
        👤
      </Link>

      {/* Botão central (opcional – criar tweet futuramente) */}
      <button className="tweet-button" disabled>
        ✍️
      </button>

      <button onClick={logout} className="logout">
        🚪
      </button>
    </nav>
  );
}
