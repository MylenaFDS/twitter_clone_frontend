import { useEffect, useState } from "react";
import TweetBox from "../components/TweetBox";
import TweetCard from "../components/TweetCard";
import SkeletonTweet from "../components/SkeletonTweet";
import type { Tweet } from "../types/Tweet";
import { getTweets } from "../services/tweets";
import TopBar from "../components/TopBar";

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
    <>
      <TopBar />
      <TweetBox onTweet={handleNewTweet} />

      {/* 🔹 Skeleton enquanto carrega */}
      {loading ? (
        <>
          <SkeletonTweet />
          <SkeletonTweet />
          <SkeletonTweet />
        </>
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </>
  );
}
