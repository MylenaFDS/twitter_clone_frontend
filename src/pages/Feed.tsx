import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import TweetCard from "../components/TweetCard";

export default function Feed() {
  return (
    <Layout>
      <TopBar />

      <TweetCard
        username="adminuser"
        content="Meu primeiro tweet 🚀"
      />
      <TweetCard
        username="mylenafds"
        content="Clone do Twitter em React + Django 😍"
      />
    </Layout>
  );
}


