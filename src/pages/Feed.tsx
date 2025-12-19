import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TweetBox from "../components/TweetBox";
import TweetCard from "../components/TweetCard";
import type { Tweet } from "../types/Tweet";
import { getTweets } from "../services/tweets";

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTweets() {
      try {
        const data = await getTweets();
        setTweets(data);
      } catch {
        alert("Erro ao carregar feed");
      } finally {
        setLoading(false);
      }
    }

    loadTweets();
  }, []);

  function handleNewTweet(tweet: Tweet) {
    setTweets((prev) => [tweet, ...prev]);
  }

  return (
    <Layout>
      <TweetBox onTweet={handleNewTweet} />

      {loading && <p style={{ color: "#71767b" }}>Carregando...</p>}

      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </Layout>
  );
}


