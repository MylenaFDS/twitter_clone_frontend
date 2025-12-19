import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import type { Tweet } from "../types/Tweet";
import "../styles/profile.css";

export default function Profile() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://127.0.0.1:9000/api/posts/?author=me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data: Tweet[]) => setTweets(data));
  }, [token]);

  return (
    <div>
      <div className="profile-header">
        <h2>Meu perfil</h2>
        <span>{tweets.length} Tweets</span>
      </div>

      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
