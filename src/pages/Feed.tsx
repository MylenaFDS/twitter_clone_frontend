import { useState } from "react";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import TweetBox from "../components/TweetBox";
import TweetCard from "../components/TweetCard";
import type { Tweet } from "../types/Tweet";

export default function Feed() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      username: "adminuser",
      content: "Meu primeiro tweet 🚀",
    },
    {
      id: 2,
      username: "mylenafds",
      content: "Clone do Twitter em React + Django 😍",
    },
  ]);

  function handleNewTweet(tweet: Tweet) {
    setTweets((prev) => [tweet, ...prev]);
  }

  return (
    <Layout>
      <TopBar />
      <TweetBox onTweet={handleNewTweet} />

      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </Layout>
  );
}

