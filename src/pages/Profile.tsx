import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import EditProfileModal from "../components/EditProfileModal";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";

type UserProfile = {
  bio?: string;
  avatar?: string;
  banner?: string;
};

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    bio: "",
    avatar: "",
    banner: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:9000/api/posts/?author=me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Tweet[]) => setTweets(data));
  }, [token]);

  return (
    <div className="profile-page">
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
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder" />
          )}
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => setIsEditing(true)}
        >
          Editar perfil
        </button>
      </div>

      {/* 🔹 Bio */}
      {user.bio && <p className="profile-bio">{user.bio}</p>}

      {/* 🔹 Contador */}
      <div className="profile-stats">
        <strong>{tweets.length}</strong> Tweets
      </div>

      {/* 🔹 Tweets */}
      <div className="profile-tweets">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      {/* 🔹 Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        onSave={(data) =>
          setUser((prev) => ({
            ...prev,
            ...data,
          }))
        }
      />
    </div>
  );
}
