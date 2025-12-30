import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import TweetBox from "../components/TweetBox";
import TweetCard from "../components/TweetCard";
import SkeletonTweet from "../components/SkeletonTweet";
import EmptyFeed from "../components/EmptyFeed";
import TopBar from "../components/TopBar";
import type { Tweet } from "../types/Tweet";

import { getTweets } from "../services/tweets";
import { showError } from "../utils/toast";
import { TOAST_MESSAGES } from "../utils/toastMessages";
import "../styles/feed.css";
interface SuggestedUser {
  id: number;
  username: string;
  avatar: string | null;
  is_following: boolean;
}

const API_BASE_URL = "http://127.0.0.1:9000";

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getTweets();
        setTweets(data ?? []);

        if (token) {
          const res = await fetch(
            `${API_BASE_URL}/api/users/suggestions/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.ok) {
            const users = await res.json();
            setSuggestions(users);
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            showError(TOAST_MESSAGES.feed.unauthorized);
          } else {
            showError(TOAST_MESSAGES.feed.loadError);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  function handleNewTweet(tweet: Tweet) {
    setTweets((prev) => [tweet, ...prev]);
  }

  async function handleToggleFollow(userId: number, isFollowing: boolean) {
    if (!token) return;

    const url = isFollowing
      ? `${API_BASE_URL}/api/users/${userId}/unfollow/`
      : `${API_BASE_URL}/api/follows/${userId}/`;

    await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSuggestions((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, is_following: !u.is_following }
          : u
      )
    );
  }

  return (
    <>
      <TopBar />
      <TweetBox onTweet={handleNewTweet} />

      {/* 🔹 Sugestões de seguidores */}
      {suggestions.length > 0 && (
        <div className="suggestions-box">
          <h4>Quem seguir</h4>

          {suggestions.map((u) => (
            <div key={u.id} className="suggestion-row">
              <div className="user-info">
                <img
                  src={u.avatar ?? "https://via.placeholder.com/40"}
                  alt="avatar"
                />
                <span>@{u.username}</span>
              </div>

              <button
                className={
                  u.is_following
                    ? "mini-follow-btn following"
                    : "mini-follow-btn"
                }
                onClick={() =>
                  handleToggleFollow(u.id, u.is_following)
                }
              >
                {u.is_following ? "Seguindo" : "Seguir"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Conteúdo */}
      {loading ? (
        <>
          <SkeletonTweet />
          <SkeletonTweet />
          <SkeletonTweet />
        </>
      ) : tweets.length === 0 ? (
        <EmptyFeed />
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </>
  );
}
