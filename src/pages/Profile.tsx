import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import EditProfileModal from "../components/EditProfileModal";
import SkeletonTweet from "../components/SkeletonTweet";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";

interface UserProfile {
  bio: string;
  avatar: string;
  banner: string;
}

type Tab = "tweets" | "likes";

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<UserProfile>({
    bio: "",
    avatar: "",
    banner: "",
  });

  const [activeTab, setActiveTab] = useState<Tab>("tweets");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
  if (!token) {
    setLoading(false);
    return;
  }

  async function loadProfile() {
    try {
      const [userRes, tweetsRes] = await Promise.all([
        fetch("http://127.0.0.1:9000/api/me/", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://127.0.0.1:9000/api/posts/?author=me", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const userData = await userRes.json();
      const tweetsData = await tweetsRes.json();

      setUser({
        bio: userData.bio || "",
        avatar: userData.avatar || "",
        banner: userData.banner || "",
      });

      setTweets(tweetsData);
    } catch (err) {
      console.error("Erro ao carregar perfil", err);
    } finally {
      setLoading(false);
    }
  }

  loadProfile();
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

      {/* 🔹 Tabs */}
      <div className="profile-tabs">
        <button
          className={activeTab === "tweets" ? "active" : ""}
          onClick={() => setActiveTab("tweets")}
        >
          Tweets
        </button>

        <button
          className={activeTab === "likes" ? "active" : ""}
          onClick={() => setActiveTab("likes")}
        >
          Curtidas
        </button>
      </div>

      {/* 🔹 Conteúdo das abas */}
      {loading ? (
        <>
          <SkeletonTweet />
          <SkeletonTweet />
        </>
      ) : activeTab === "tweets" ? (
        tweets.length === 0 ? (
          <div className="empty-profile">
            <h3>Você ainda não tweetou</h3>
            <p>Quando você publicar algo, aparecerá aqui.</p>
          </div>
        ) : (
          tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        )
      ) : (
        <div className="empty-profile">
          <h3>Nenhuma curtida ainda</h3>
          <p>Quando você curtir um tweet, ele aparecerá aqui.</p>
        </div>
      )}

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

