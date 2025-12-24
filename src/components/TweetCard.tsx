import { useState } from "react";
import "../styles/tweet.css";
import type { Tweet } from "../types/Tweet";
import { toggleLike } from "../services/tweets";
import Comments from "./Comments"; // 👈 vamos usar

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
  const [commentsCount, setCommentsCount] = useState(tweet.comments_count); // ✅
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
      <div className="tweet-avatar">
        <div className="avatar-circle">
          {tweet.author.username[0].toUpperCase()}
        </div>
      </div>

      <div className="tweet-content">
        <div className="tweet-header">
          <span className="tweet-name">@{tweet.author.username}</span>
          <span className="tweet-time">· {timeAgo(tweet.created_at)}</span>
        </div>

        <p className="tweet-text">{tweet.content}</p>

        <div className="tweet-actions">
          <button
            aria-label="Comentar"
            onClick={() => setShowComments((prev) => !prev)}
          >
            💬 {commentsCount}
          </button>

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
