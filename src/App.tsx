import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<div>Recuperar senha (em breve)</div>} />
        <Route
          path="/"
          element={isAuthenticated ? <Feed /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}



