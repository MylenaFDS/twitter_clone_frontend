import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";

interface TweetProps {
  tweet: Tweet;
}

export default function TweetCard({ tweet }: TweetProps) {
  return (
    <div className="tweet">
      <div className="avatar">👤</div>

      <div className="tweet-body">
        <strong>@{tweet.username}</strong>
        <p>{tweet.content}</p>

        <div className="tweet-actions">
          <span>💬</span>
          <span>🔁</span>
          <span>❤️</span>
          <span>📤</span>
        </div>
      </div>
    </div>
  );
}
