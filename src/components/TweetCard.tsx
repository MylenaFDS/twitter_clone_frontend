import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";

interface TweetProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetProps) {
  return (
    <article className="tweet">
      {/* AVATAR */}
      <div className="tweet-avatar">👤</div>

      {/* CONTEÚDO */}
      <div className="tweet-content">
        {/* HEADER */}
        <div className="tweet-header">
          <span className="tweet-name">
            @{tweet.author.username}
          </span>
        </div>

        {/* TEXTO */}
        <p className="tweet-text">{tweet.content}</p>

        {/* AÇÕES */}
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
