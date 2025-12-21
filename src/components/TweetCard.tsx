import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";

interface TweetProps {
  tweet: Tweet;
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

export default function TweetCard({ tweet }: TweetProps) {
  return (
    <article className="tweet">
      {/* AVATAR SIMPLES */}
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
          <button aria-label="Curtir">
            ❤️ {tweet.likes_count}
          </button>
          <button aria-label="Compartilhar">📤</button>
        </div>
      </div>
    </article>
  );
}
