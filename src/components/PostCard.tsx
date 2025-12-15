import type { Post } from "../types/Post";
import api from "../services/api";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  async function like() {
    await api.post("/likes/", { post: post.id });
  }

  return (
    <div>
      <strong>@{post.author.username}</strong>
      <p>{post.content}</p>
      <button onClick={like}>Curtir</button>
    </div>
  );
}

