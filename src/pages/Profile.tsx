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
  id: number;
  username: string;
  bio: string;
  avatar: string;
  banner: string;
  followers_count: number;
  following_count: number;
}

interface SimpleUser {
  id: number;
  username: string;
  avatar: string | null;
}


type Tab = "tweets" | "likes";

const API_BASE_URL = "http://127.0.0.1:9000";

function resolveMediaUrl(url?: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
}

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("tweets");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  /* 🔹 Modal seguidores/seguindo */
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] =
    useState<"followers" | "following">("followers");
  const [listUsers, setListUsers] = useState<SimpleUser[]>([]);
  const [listLoading, setListLoading] = useState(false);

  const token = localStorage.getItem("access");

  /* 🔹 Carregar perfil + tweets */
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadProfile() {
      setLoading(true);

      try {
        const userRes = await fetch(`${API_BASE_URL}/api/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();
        setUser(userData);

        const postsUrl =
          activeTab === "tweets"
            ? `${API_BASE_URL}/api/posts/?author=me`
            : `${API_BASE_URL}/api/posts/?liked=me`;

        const postsRes = await fetch(postsUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTweets(await postsRes.json());
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

  /* 🔹 Abrir lista seguidores / seguindo (CORRIGIDO) */
  async function openList(type: "followers" | "following") {
    if (!token || !user) return;

    setModalType(type);
    setShowModal(true);
    setListLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/${user.id}/${type}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error();
      setListUsers(await res.json());
    } catch {
      showError("Erro ao carregar lista");
    } finally {
      setListLoading(false);
    }
  }

  /* 🔹 Remove tweet da aba Curtidas */
  function handleUnlike(tweetId: number) {
    if (activeTab === "likes") {
      setTweets((prev) => prev.filter((t) => t.id !== tweetId));
    }
  }

  async function handleUnfollow(userId: number) {
  if (!token || !user) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/users/${userId}/unfollow/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error();

    // 🔹 Remove da lista
    setListUsers((prev) => prev.filter((u) => u.id !== userId));

    // 🔹 Atualiza contador
    setUser((prev) =>
      prev
        ? { ...prev, following_count: prev.following_count - 1 }
        : prev
    );
  } catch {
    showError("Erro ao deixar de seguir");
  }
}


  /* 🔹 Salvar perfil */
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
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    setUser(data);
  }

  /* 🔹 Alterar senha */
  async function handleChangePassword(data: {
    old_password: string;
    new_password: string;
  }) {
    if (!token) return;

    await fetch(`${API_BASE_URL}/api/change-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  if (!user) return null;

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

        <div className="follow-info">
          <span onClick={() => openList("following")}>
            <strong>{user.following_count}</strong> Seguindo
          </span>
          <span onClick={() => openList("followers")}>
            <strong>{user.followers_count}</strong> Seguidores
          </span>
        </div>

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
          <h3>Nada para mostrar</h3>
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

      {/* 🔹 Modal seguidores / seguindo */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-twitter" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalType === "followers" ? "Seguidores" : "Seguindo"}</h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {listLoading ? (
                <p>Carregando...</p>
              ) : listUsers.length === 0 ? (
                <p>Nenhum usuário</p>
              ) : (
                listUsers.map((u) => (
                  <div key={u.id} className="user-row">
  <img
    src={u.avatar ?? "https://via.placeholder.com/40"}
    alt="avatar"
  />

  <span>@{u.username}</span>

  {modalType === "following" && u.id !== user.id && (
    <button
      className="unfollow-btn"
      onClick={() => handleUnfollow(u.id)}
    >
      Deixar de seguir
    </button>
  )}
</div>

                ))
              )}
            </div>
          </div>
        </div>
      )}

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
