import "../styles/tweet.css";

interface TweetProps {
  username: string;
  content: string;
  time?: string;
}

export default function TweetCard({
  username,
  content,
  time = "agora",
}: TweetProps) {
  return (
    <div className="tweet">
      {/* Avatar */}
      <div className="tweet-avatar">
        <span>👤</span>
      </div>

      {/* Conteúdo */}
      <div className="tweet-content">
        {/* Header */}
        <div className="tweet-header">
          <span className="tweet-name">{username}</span>
          <span className="tweet-username">@{username}</span>
          <span className="tweet-dot">·</span>
          <span className="tweet-time">{time}</span>
        </div>

        {/* Texto */}
        <p className="tweet-text">{content}</p>

        {/* Ações */}
        <div className="tweet-actions">
          <button title="Responder">💬</button>
          <button title="Repostar">🔁</button>
          <button title="Curtir">❤️</button>
          <button title="Compartilhar">📤</button>
        </div>
      </div>
    </div>
  );
}
