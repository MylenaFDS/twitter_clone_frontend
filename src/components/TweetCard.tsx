import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";

interface TweetProps {
  tweet: Tweet;
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
