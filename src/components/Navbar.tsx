import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Feed</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;

