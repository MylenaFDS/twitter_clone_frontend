import { useEffect, useState } from "react";
import TweetBox from "../components/TweetBox";
import TweetCard from "../components/TweetCard";
import SkeletonTweet from "../components/SkeletonTweet";
import EmptyFeed from "../components/EmptyFeed";
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
      setTweets(data ?? []);
    } catch (error) {
      console.error(error);
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

      {/* 🔹 Conteúdo */}
      {loading ? (
        <>
          <SkeletonTweet />
          <SkeletonTweet />
          <SkeletonTweet />
        </>
      ) : tweets.length === 0 ? (
        <EmptyFeed />
      ) : (
        tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </>
  );
}
