import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const token = localStorage.getItem("access");
  const isAuthenticated = Boolean(token);

  return (
    <HashRouter>
      <Routes>
        {/* 🔓 Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />


        {/* 🔐 Feed */}
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

        {/* 🔐 Meu perfil */}
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

        {/* 🔐 Perfil de outro usuário */}
        <Route
          path="/users/:id"
          element={
            isAuthenticated ? (
              <Layout>
                <UserProfile />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
}
