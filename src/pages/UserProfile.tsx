import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import TweetCard from "../components/TweetCard";
import SkeletonTweet from "../components/SkeletonTweet";
import { toast } from "react-toastify";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";

interface UserProfile {
  id: number;
  username: string;
  bio: string;
  avatar: string | null;
  banner: string | null;
  is_following: boolean;
  followers_count: number;
  following_count: number;
}

interface SimpleUser {
  id: number;
  username: string;
  avatar: string | null;
}

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  const [meId, setMeId] = useState<number | null>(null);
  const [followLoading, setFollowLoading] = useState(false);

  /* 🔹 Modal */
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following">(
    "followers"
  );
  const [listUsers, setListUsers] = useState<SimpleUser[]>([]);
  const [listLoading, setListLoading] = useState(false);

  const token = localStorage.getItem("access");
  const API_BASE_URL = "http://127.0.0.1:9000";

  /* 🔹 Carrega perfil */
  const loadProfile = useCallback(async () => {
    if (!id || !token) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);

      const postsRes = await fetch(
        `${API_BASE_URL}/api/posts/?author=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!postsRes.ok) throw new Error();
      setTweets(await postsRes.json());
    } catch {
      toast.error("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  /* 🔹 Usuário logado */
  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE_URL}/api/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMeId(data.id))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* 🔹 Abrir modal seguidores / seguindo */
  async function openList(type: "followers" | "following") {
    if (!id || !token) return;

    setModalType(type);
    setShowModal(true);
    setListLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/users/${id}/${type}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error();
      setListUsers(await res.json());
    } catch {
      toast.error("Erro ao carregar lista");
    } finally {
      setListLoading(false);
    }
  }

  /* 🔹 Seguir / deixar de seguir */
  async function handleToggleFollow() {
  if (!id || !token || followLoading || !user) return;

  const wasFollowing = user.is_following;

  // 🔹 Atualização otimista
  setUser({
    ...user,
    is_following: !wasFollowing,
    followers_count: wasFollowing
      ? user.followers_count - 1
      : user.followers_count + 1,
  });

  setFollowLoading(true);

  try {
    const res = await fetch(`${API_BASE_URL}/api/follows/${id}/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error();
    const data = await res.json();

    // 🔹 Garante consistência
    setUser((prev) =>
      prev
        ? {
            ...prev,
            is_following: data.following,
          }
        : prev
    );
  } catch {
    // 🔹 Reverte se der erro
    setUser((prev) =>
      prev
        ? {
            ...prev,
            is_following: wasFollowing,
            followers_count: wasFollowing
              ? prev.followers_count + 1
              : prev.followers_count - 1,
          }
        : prev
    );

    toast.error("Erro ao seguir usuário");
  } finally {
    setFollowLoading(false);
  }
}


  /* 🔹 Loading */
  if (loading) {
    return (
      <>
        <SkeletonTweet />
        <SkeletonTweet />
      </>
    );
  }

  if (!user) return null;

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
          src={user.avatar ?? "https://via.placeholder.com/120"}
          alt="Avatar"
        />

        {meId !== null && meId !== user.id && (
          <button
            className={`follow-btn ${
              user.is_following ? "following" : ""
            }`}
            onClick={handleToggleFollow}
            disabled={followLoading}
          >
            {user.is_following ? "Seguindo" : "Seguir"}
          </button>
        )}
      </div>

      {/* 🔹 Info */}
      <div className="profile-info">
        <h2>@{user.username}</h2>
        {user.bio && <p className="bio">{user.bio}</p>}

        <div className="follow-info">
          <span onClick={() => openList("following")}>
            <strong>{user.following_count}</strong> Seguindo
          </span>
          <span onClick={() => openList("followers")}>
            <strong>{user.followers_count}</strong> Seguidores
          </span>
        </div>
      </div>

      {/* 🔹 Tweets */}
      {tweets.length === 0 ? (
        <div className="empty-profile">
          <h3>Este usuário ainda não tweetou</h3>
        </div>
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}

      {/* 🔹 MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-twitter"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {modalType === "followers"
                  ? "Seguidores"
                  : "Seguindo"}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              {listLoading ? (
                <p className="loading-text">Carregando...</p>
              ) : listUsers.length === 0 ? (
                <p className="loading-text">Nenhum usuário</p>
              ) : (
                listUsers.map((u) => (
                  <Link
                    to={`/users/${u.id}`}
                    key={u.id}
                    className="user-row"
                    onClick={() => setShowModal(false)}
                  >
                    <img
                      src={
                        u.avatar ??
                        "https://via.placeholder.com/40"
                      }
                      alt="avatar"
                    />
                    <span>@{u.username}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
