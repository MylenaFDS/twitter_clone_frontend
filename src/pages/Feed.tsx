import { useEffect, useState } from "react";
import api from "../services/api";
import type { Post } from "../types/Post";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return; // ⛔ NÃO busca sem token

    api.get<Post[]>("/posts/")
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error("Erro ao carregar feed", err);
      });
  }, [token]);

  if (!token) {
    return <p>Você precisa estar logado.</p>;
  }

  return (
    <>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
}
