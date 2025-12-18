import { useState } from "react";
import "../styles/tweetbox.css";
import type { Tweet } from "../types/Tweet";
import { createTweet } from "../services/tweets";

interface Props {
  onTweet: (tweet: Tweet) => void;
}

export default function TweetBox({ onTweet }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTweet() {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const newTweet = await createTweet({ content });
      onTweet(newTweet);
      setContent("");
    } catch {
      alert("Erro ao publicar tweet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="tweetbox">
      <div className="tweetbox-avatar">👤</div>

      <div className="tweetbox-body">
        <textarea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="tweetbox-footer">
          <button
            disabled={!content.trim() || loading}
            onClick={handleTweet}
          >
            {loading ? "Tweetando..." : "Tweetar"}
          </button>
        </div>
      </div>
    </div>
  );
}

