import { useEffect, useState } from "react";
import { getComments } from "../services/comments";
import type { Comment } from "../types/Comment";
import "../styles/comments.css";

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getComments(postId);
        setComments(data);
      } catch {
        alert("Erro ao carregar comentários");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [postId]);

  if (loading) return <p className="comments-loading">Carregando...</p>;

  if (comments.length === 0)
    return <p className="comments-empty">Nenhum comentário ainda</p>;

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <strong>@{comment.author.username}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
