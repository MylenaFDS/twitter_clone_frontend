import "../styles/tweet.css";

interface TweetProps {
  username: string;
  content: string;
}

export default function TweetCard({ username, content }: TweetProps) {
  return (
    <div className="tweet">
      <div className="avatar">👤</div>

      <div className="tweet-body">
        <strong>@{username}</strong>
        <p>{content}</p>

        <div className="tweet-actions">
          💬 🔁 ❤️ 📤
        </div>
      </div>
    </div>
  );
}
