import { useEffect, useState } from "react";
import api from "../services/api";
import type { Post } from "../types/Post";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api
      .get("/feed/")
      .then((response) => setPosts(response.data))
      .catch((error) => {
        console.error("Erro ao carregar feed", error);
      });
  }, []);

  return (
    <div>
      <h1>Feed</h1>
      {posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  );
}
