import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Layout from "./components/Layout";

export default function App() {
  const token = localStorage.getItem("access");
  const isAuthenticated = Boolean(token);
  


  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<div>Recuperar senha (em breve)</div>}
        />

        {/* 🔐 Rotas protegidas */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Feed />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout>
                <Profile />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
