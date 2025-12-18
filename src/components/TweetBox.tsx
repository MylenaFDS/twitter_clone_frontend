import { useState } from "react";
import type { Tweet } from "../types/Tweet";
import "../styles/tweetbox.css";

interface Props {
  onTweet: (tweet: Tweet) => void;
}

export default function TweetBox({ onTweet }: Props) {
  const [content, setContent] = useState("");

  function handleTweet() {
    if (!content.trim()) return;

    onTweet({
      id: Date.now(),
      username: "adminuser",
      content,
    });

    setContent("");
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
          <button disabled={!content.trim()} onClick={handleTweet}>
            Tweetar
          </button>
        </div>
      </div>
    </div>
  );
}

