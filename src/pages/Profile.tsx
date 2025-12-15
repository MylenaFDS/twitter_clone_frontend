import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getAuthHeaders } from "../services/auth";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/", { headers: getAuthHeaders() });
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/profile/", { username, email }, { headers: getAuthHeaders() });
      alert("Profile updated");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <form onSubmit={handleUpdate} className="form">
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;

