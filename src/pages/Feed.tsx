import Layout from "../components/Layout";
import TweetCard from "../components/TweetCard";

export default function Feed() {
  return (
    <Layout>
      <TweetCard username="adminuser" content="Meu primeiro tweet 🚀" />
      <TweetCard username="mylenafds" content="Clone do Twitter em React + Django 😍" />
    </Layout>
  );
}

