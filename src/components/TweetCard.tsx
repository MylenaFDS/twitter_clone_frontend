import { useState } from "react";
import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";
import { toggleLike } from "../services/tweets";

interface TweetProps {
  tweet: Tweet;
  onUnlike?: (tweetId: number) => void;
}

// 🔹 Tempo relativo
function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "agora";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}

export default function TweetCard({ tweet, onUnlike }: TweetProps) {
  const [liked, setLiked] = useState(tweet.liked);
  const [likesCount, setLikesCount] = useState(tweet.likes_count);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;

    setLoading(true);
    try {
      const data = await toggleLike(tweet.id);

      setLiked(data.liked);
      setLikesCount((prev) =>
        data.liked ? prev + 1 : prev - 1
      );

      // ✅ Se estava curtido e agora foi descurtido
      if (!data.liked && onUnlike) {
        onUnlike(tweet.id);
      }
    } catch {
      alert("Erro ao curtir post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="tweet">
      {/* AVATAR */}
      <div className="tweet-avatar">
        <div className="avatar-circle">
          {tweet.author.username[0].toUpperCase()}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="tweet-content">
        <div className="tweet-header">
          <span className="tweet-name">
            @{tweet.author.username}
          </span>

          <span className="tweet-time">
            · {timeAgo(tweet.created_at)}
          </span>
        </div>

        <p className="tweet-text">{tweet.content}</p>

        <div className="tweet-actions">
          <button aria-label="Comentar">💬</button>
          <button aria-label="Retweetar">🔁</button>

          <button
            aria-label="Curtir"
            onClick={handleLike}
            className={liked ? "liked" : ""}
            disabled={loading}
          >
            ❤️ {likesCount}
          </button>

          <button aria-label="Compartilhar">📤</button>
        </div>
      </div>
    </article>
  );
}
