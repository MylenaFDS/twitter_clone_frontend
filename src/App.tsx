import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access"))
  );

  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/feed"
          element={
            isAuthenticated ? (
              <Layout><Feed /></Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Layout><Profile /></Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/users/:id"
          element={
            isAuthenticated ? (
              <Layout><UserProfile /></Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </HashRouter>
  );
}
