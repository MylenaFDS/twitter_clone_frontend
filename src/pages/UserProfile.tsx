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
  avatar: string;
  banner: string;
  is_following: boolean; // ✅ vem do backend
}

export default function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");
  const API_BASE_URL = "http://127.0.0.1:9000";

  const loadProfile = useCallback(async () => {
    if (!id || !token) return;

    setLoading(true);

    try {
      // 🔹 Dados do usuário visitado
      const userRes = await fetch(
        `${API_BASE_URL}/api/users/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!userRes.ok) throw new Error();

      const userData: UserProfile = await userRes.json();
      setUser(userData);
      setIsFollowing(userData.is_following); // ✅ CORRETO

      // 🔹 Tweets do usuário visitado
      const postsRes = await fetch(
        `${API_BASE_URL}/api/posts/?author=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const postsData: Tweet[] = await postsRes.json();
      setTweets(postsData);
    } catch {
      toast.error("Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function handleToggleFollow() {
    if (!id || !token) return;

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
      setIsFollowing(data.following);

      toast.success(
        data.following
          ? "Agora você segue este usuário"
          : "Você deixou de seguir"
      );
    } catch {
      toast.error("Erro ao seguir usuário");
    }
  }

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
            ? `url(${API_BASE_URL}${user.banner})`
            : undefined,
        }}
      />

      {/* 🔹 Avatar + botão */}
      <div className="profile-top">
        <img
          className="profile-avatar"
          src={
            user.avatar
              ? `${API_BASE_URL}${user.avatar}`
              : "https://via.placeholder.com/120"
          }
          alt="Avatar"
        />

        <button
          className={`follow-btn ${isFollowing ? "following" : ""}`}
          onClick={handleToggleFollow}
        >
          {isFollowing ? "Seguindo" : "Seguir"}
        </button>
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
