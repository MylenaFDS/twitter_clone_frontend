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

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:9000/api/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setUser({
          bio: data.bio || "",
          avatar: data.avatar || "",
          banner: data.banner || "",
        })
      );

    fetch("http://127.0.0.1:9000/api/posts/?author=me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Tweet[]) => setTweets(data));
  }, [token]);

  return (
    <div>
      {/* 🔹 Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: user.banner
            ? `url(${user.banner})`
            : undefined,
        }}
      />

      {/* 🔹 Header */}
      <div className="profile-header">
        <img
          className="profile-avatar"
          src={user.avatar || "https://via.placeholder.com/120"}
          alt="Avatar"
        />

        {/* 🔹 Botão editar */}
        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Editar perfil
        </button>

        <div className="profile-info">
          <h2>Meu perfil</h2>
          <span>{tweets.length} Tweets</span>

          {user.bio && (
            <p className="profile-bio">{user.bio}</p>
          )}
        </div>
      </div>

      {/* 🔹 Tweets */}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}

      {/* 🔹 Modal de edição */}
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar perfil</h3>

            <p>(Modal funcionando 👍)</p>

            <button onClick={() => setIsEditing(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
