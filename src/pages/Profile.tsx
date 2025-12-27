import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import EditProfileModal from "../components/EditProfileModal";
import SkeletonTweet from "../components/SkeletonTweet";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";
import { showError } from "../utils/toast";
import { TOAST_MESSAGES } from "../utils/toastMessages";
import { AxiosError } from "axios";

interface UserProfile {
  username: string;
  bio: string;
  avatar: string;
  banner: string;
}

type Tab = "tweets" | "likes";

const API_BASE_URL = "http://127.0.0.1:9000";

function resolveMediaUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<UserProfile>({
    username: "",
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
      setLoading(true);

      try {
        // 🔹 Perfil do usuário
        const userRes = await fetch(`${API_BASE_URL}/api/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();

        setUser({
          username: userData.username,
          bio: userData.bio || "",
          avatar: userData.avatar || "",
          banner: userData.banner || "",
        });

        // 🔹 Tweets / Curtidas
        const postsUrl =
          activeTab === "tweets"
            ? `${API_BASE_URL}/api/posts/?author=me`
            : `${API_BASE_URL}/api/posts/?liked=me`;

        const postsRes = await fetch(postsUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const postsData = await postsRes.json();
        setTweets(postsData);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            showError(TOAST_MESSAGES.profile.updateError);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token, activeTab]);

  // ✅ Remove tweet da aba Curtidas ao descurtir
  function handleUnlike(tweetId: number) {
    if (activeTab === "likes") {
      setTweets((prev) => prev.filter((tweet) => tweet.id !== tweetId));
    }
  }

  // 🔹 Atualizar perfil
  async function handleSaveProfile(updatedData: {
    username?: string;
    bio?: string;
    avatar?: File | null;
    banner?: File | null;
  }) {
    if (!token) return;

    const formData = new FormData();

    if (updatedData.username) formData.append("username", updatedData.username);
    if (updatedData.bio) formData.append("bio", updatedData.bio);
    if (updatedData.avatar) formData.append("avatar", updatedData.avatar);
    if (updatedData.banner) formData.append("banner", updatedData.banner);

    const res = await fetch(`${API_BASE_URL}/api/me/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Erro ao salvar perfil");
    }

    const data = await res.json();

    setUser({
      username: data.username,
      bio: data.bio || "",
      avatar: data.avatar || "",
      banner: data.banner || "",
    });
  }

  // 🔹 Alterar senha
  async function handleChangePassword(data: {
    old_password: string;
    new_password: string;
  }) {
    if (!token) return;

    const res = await fetch(`${API_BASE_URL}/api/change-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Erro ao alterar senha");
    }
  }

  return (
    <div className="profile">
      {/* 🔹 Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: user.banner
            ? `url(${resolveMediaUrl(user.banner)})`
            : undefined,
        }}
      />

      {/* 🔹 Avatar */}
      <div className="profile-top">
        <img
          className="profile-avatar"
          src={
            user.avatar
              ? resolveMediaUrl(user.avatar)
              : "https://via.placeholder.com/120"
          }
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
        <h2>@{user.username}</h2>
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

      {/* 🔹 Conteúdo */}
      {loading ? (
        <>
          <SkeletonTweet />
          <SkeletonTweet />
        </>
      ) : tweets.length === 0 ? (
        <div className="empty-profile">
          {activeTab === "tweets" ? (
            <>
              <h3>Você ainda não tweetou</h3>
              <p>Quando você publicar algo, aparecerá aqui.</p>
            </>
          ) : (
            <>
              <h3>Nenhuma curtida ainda</h3>
              <p>Quando você curtir um tweet, ele aparecerá aqui.</p>
            </>
          )}
        </div>
      ) : (
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onUnlike={handleUnlike}
          />
        ))
      )}

      {/* 🔹 Modal */}
      <EditProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        onSaveProfile={handleSaveProfile}
        onChangePassword={handleChangePassword}
      />
    </div>
  );
}
