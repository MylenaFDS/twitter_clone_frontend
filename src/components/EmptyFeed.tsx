import "../styles/empty-feed.css";
import { Link } from "react-router-dom";

export default function EmptyFeed() {
  return (
    <div className="empty-feed">
      <h2>Seu feed está vazio</h2>
      <p>
        Comece seguindo pessoas ou publique seu primeiro tweet.
      </p>

      <div className="empty-feed-actions">
        <Link to="/profile" className="empty-btn">
          Criar tweet
        </Link>
      </div>
    </div>
  );
}
