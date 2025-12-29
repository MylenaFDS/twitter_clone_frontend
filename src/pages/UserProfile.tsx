import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
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
}

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  const [meId, setMeId] = useState<number | null>(null);
  const [followLoading, setFollowLoading] = useState(false);

  const token = localStorage.getItem("access");
  const API_BASE_URL = "http://127.0.0.1:9000";

  /* 🔹 Carrega perfil visitado */
  const loadProfile = useCallback(async () => {
    if (!id || !token) return;

    setLoading(true);

    try {
      /* 🔹 PERFIL COMPLETO (já inclui avatar e banner) */
      const profileRes = await fetch(
        `${API_BASE_URL}/api/profiles/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!profileRes.ok) throw new Error();
      const profileData: UserProfile = await profileRes.json();

      setUser(profileData);

      /* 🔹 TWEETS DO USUÁRIO */
      const postsRes = await fetch(
        `${API_BASE_URL}/api/posts/?author=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!postsRes.ok) throw new Error();
      const postsData: Tweet[] = await postsRes.json();
      setTweets(postsData);
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMeId(data.id))
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  /* 🔹 Seguir / Deixar de seguir */
  async function handleToggleFollow() {
    if (!id || !token || followLoading || !user) return;

    const previous = user.is_following;

    setUser({ ...user, is_following: !previous });
    setFollowLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/follows/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      const data: { following: boolean } = await res.json();

      setUser((prev) =>
        prev ? { ...prev, is_following: data.following } : prev
      );

      toast.success(
        data.following
          ? "Agora você segue este usuário"
          : "Você deixou de seguir"
      );
    } catch {
      setUser((prev) =>
        prev ? { ...prev, is_following: previous } : prev
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
          backgroundImage: user.banner
            ? `url(${user.banner})`
            : undefined,
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
            {followLoading
              ? "Aguarde..."
              : user.is_following
              ? "Seguindo"
              : "Seguir"}
          </button>
        )}
      </div>

      {/* 🔹 Info */}
      <div className="profile-info">
        <h2>@{user.username}</h2>
        {user.bio && <p className="bio">{user.bio}</p>}
        <span>{tweets.length} Tweets</span>
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
    </div>
  );
}
