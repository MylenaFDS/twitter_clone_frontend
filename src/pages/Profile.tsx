import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import EditProfileModal from "../components/EditProfileModal";
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
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // 🔹 Dados do usuário
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
      });

    // 🔹 Tweets do usuário
    fetch("http://127.0.0.1:9000/api/posts/?author=me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Tweet[]) => setTweets(data));
  }, [token]);

  async function handleSaveProfile(updatedData: UserProfile) {
  if (!token) return;

  const res = await fetch("http://127.0.0.1:9000/api/me/", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Erro ao salvar perfil");
  }

  const data = await res.json();
  setUser({
    bio: data.bio,
    avatar: data.avatar,
    banner: data.banner,
  });
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

      {/* 🔹 Modal de edição */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
