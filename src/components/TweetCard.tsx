import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";
import { toggleLike } from "../services/tweets";
import Comments from "./Comments";

interface TweetProps {
  tweet: Tweet;
  onUnlike?: (tweetId: number) => void;
}

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
  const [commentsCount, setCommentsCount] = useState(tweet.comments_count);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLike() {
    if (loading) return;
    setLoading(true);

    try {
      const data = await toggleLike(tweet.id);
      setLiked(data.liked);
      setLikesCount((prev) => (data.liked ? prev + 1 : prev - 1));

      if (!data.liked && onUnlike) {
        onUnlike(tweet.id);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="tweet">
      {/* 🔹 Avatar */}
      <div className="tweet-avatar">
        <Link to={`/users/${tweet.author.id}`}>
          {tweet.author.avatar ? (
            <img
              src={tweet.author.avatar}
              alt={tweet.author.username}
              className="avatar-circle"
            />
          ) : (
            <div className="avatar-circle avatar-fallback">
              {tweet.author.username[0].toUpperCase()}
            </div>
          )}
        </Link>
      </div>

      <div className="tweet-content">
        {/* 🔹 Header */}
        <div className="tweet-header">
          <Link
            to={`/users/${tweet.author.id}`}
            className="tweet-name"
          >
            @{tweet.author.username}
          </Link>

          <span className="tweet-time">
            · {timeAgo(tweet.created_at)}
          </span>
        </div>

        {/* 🔹 Conteúdo */}
        <p className="tweet-text">{tweet.content}</p>

        {/* 🔹 Ações */}
        <div className="tweet-actions">
          <button onClick={() => setShowComments((p) => !p)}>
            💬 {commentsCount}
          </button>
          <button
            onClick={handleLike}
            className={liked ? "liked" : ""}
            disabled={loading}
          >
            ❤️ {likesCount}
          </button>

        </div>

        {/* 🔽 Comentários */}
        {showComments && (
          <Comments
            postId={tweet.id}
            onCommentCreated={() =>
              setCommentsCount((prev) => prev + 1)
            }
            onCommentDeleted={() =>
              setCommentsCount((prev) => prev - 1)
            }
          />
        )}
      </div>
    </article>
  );
}
