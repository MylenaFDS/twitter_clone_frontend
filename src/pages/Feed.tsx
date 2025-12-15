import React, { useEffect, useState } from "react";
import api from "../services/api";
import { getAuthHeaders } from "../services/auth";
import Post from "../components/Post";

interface CommentData { id: number; author: string; content: string; }
interface PostData { id: number; author: string; content: string; likes: number; comments: CommentData[]; }

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts/", { headers: getAuthHeaders() });
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (id: number) => {
    try {
      await api.post(`/posts/${id}/like/`, {}, { headers: getAuthHeaders() });
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} {...post} onLike={handleLike} />
      ))}
    </div>
  );
};

export default Feed;

