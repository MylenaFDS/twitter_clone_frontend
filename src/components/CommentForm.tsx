import { useState } from "react";
import { createComment } from "../services/comments";

interface Props {
  postId: number;
  onNewComment: () => void;
}

export default function CommentForm({ postId, onNewComment }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createComment(postId, content);
      setContent("");
      onNewComment();
    } catch {
      alert("Erro ao comentar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva um comentário"
        disabled={loading}
      />
      <button disabled={loading}>Comentar</button>
    </form>
  );
}
