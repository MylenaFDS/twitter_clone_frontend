import { useState } from "react";
import "../styles/tweetbox.css";

export default function TweetBox() {
  const [content, setContent] = useState("");

  const maxLength = 280;

  function handleTweet() {
    if (!content.trim()) return;

    // por enquanto só visual (backend depois)
    console.log("Tweet:", content);
    setContent("");
  }

  return (
    <div className="tweetbox">
      <div className="tweetbox-avatar">👤</div>

      <div className="tweetbox-body">
        <textarea
          placeholder="O que está acontecendo?"
          value={content}
          maxLength={maxLength}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="tweetbox-footer">
          <span
            className={`counter ${
              content.length > maxLength - 20 ? "danger" : ""
            }`}
          >
            {maxLength - content.length}
          </span>

          <button
            disabled={!content.trim()}
            onClick={handleTweet}
          >
            Tweetar
          </button>
        </div>
      </div>
    </div>
  );
}
