import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import type { Tweet } from "../types/Tweet";
import api from "../services/api";
import "../styles/profile.css";

type User = {
  id: number;
  username: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  followers_count?: number;
  following_count?: number;
  date_joined?: string;
};

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const [userRes, tweetsRes] = await Promise.all([
          api.get("/me/"),
          api.get("/posts/?author=me"),
        ]);

        setUser(userRes.data);
        setTweets(tweetsRes.data);
      } catch {
        alert("Erro ao carregar perfil");
      }
    }

    loadProfile();
  }, []);

  if (!user) return null;

  return (
    <div className="profile">
      {/* Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: `url(${
            user.banner || "https://placehold.co/600x200"
          })`,
        }}
      />

      {/* Avatar + botão */}
      <div className="profile-top">
        <img
          className="profile-avatar"
          src={user.avatar || "https://placehold.co/120"}
          alt="Avatar"
        />

        <button className="edit-profile-btn">Editar perfil</button>
      </div>

      {/* Header */}
      <div className="profile-header">
        <h2>{user.username}</h2>
        <span>{tweets.length} Tweets</span>
      </div>

      {/* Bio */}
      <div className="profile-info">
        <p className="bio">{user.bio || "Sem bio ainda"}</p>

        <p className="joined">
          📅 Entrou em{" "}
          {new Date(user.date_joined ?? "").toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="follow-info">
          <span>
            <strong>{user.following_count ?? 0}</strong> Seguindo
          </span>
          <span>
            <strong>{user.followers_count ?? 0}</strong> Seguidores
          </span>
        </div>
      </div>

      {/* Tweets */}
      <div className="profile-tweets">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
