import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";

interface UserProfile {
  bio: string;
  avatar: string;
  banner: string;
}

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<UserProfile>({
    bio: "",
    avatar: "",
    banner: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:9000/api/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          bio: data.bio || "",
          avatar: data.avatar || "",
          banner: data.banner || "",
        });
        setEditedBio(data.bio || "");
      });

    fetch("http://127.0.0.1:9000/api/posts/?author=me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Tweet[]) => setTweets(data));
  }, [token]);

  function handleSaveProfile() {
    setUser((prev) => ({
      ...prev,
      bio: editedBio,
    }));
    setIsEditing(false);
  }

  return (
    <div className="profile">
      {/* 🔹 Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: user.banner ? `url(${user.banner})` : undefined,
        }}
      />

      {/* 🔹 Avatar + botão */}
      <div className="profile-top">
        <img
          className="profile-avatar"
          src={user.avatar || "https://via.placeholder.com/120"}
          alt="Avatar"
        />

        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Editar perfil
        </button>
      </div>

      {/* 🔹 Info */}
      <div className="profile-info">
        <h2>Meu perfil</h2>
        <span>{tweets.length} Tweets</span>

        {user.bio && <p className="bio">{user.bio}</p>}
      </div>

      {/* 🔹 Tweets */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* 🔹 MODAL */}
      {isEditing && (
  <div className="modal-overlay">
    <div className="modal-twitter">
      {/* Header */}
      <div className="modal-header">
        <button
          className="close-btn"
          onClick={() => setIsEditing(false)}
        >
          ✕
        </button>

        <h3>Editar perfil</h3>

        <button
          className="save-btn"
          onClick={handleSaveProfile}
        >
          Salvar
        </button>
      </div>

      {/* Conteúdo */}
      <div className="modal-body">
        <label>Bio</label>
        <textarea
          value={editedBio}
          onChange={(e) => setEditedBio(e.target.value)}
          maxLength={160}
          placeholder="Escreva sua bio"
        />
        <span className="char-count">
          {editedBio.length}/160
        </span>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
