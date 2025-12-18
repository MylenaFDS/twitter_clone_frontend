import Layout from "../components/Layout";
import TweetCard from "../components/TweetCard";
import "../styles/feed.css";

export default function Feed() {
  return (
    <Layout>
      <div className="feed-container">
        <div className="feed-header">Página Inicial</div>

        <TweetCard
          username="adminuser"
          content="Meu primeiro tweet 🚀"
        />
        <TweetCard
          username="mylenafds"
          content="Clone do Twitter em React + Django 😍"
        />
      </div>
    </Layout>
  );
}


