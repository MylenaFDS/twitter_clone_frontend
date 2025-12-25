import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import {
  getComments,
  createComment,
  deleteComment,
  updateComment,
} from "../services/comments";
import type { Comment } from "../types/Comment";

interface Props {
  postId: number;
  onCommentCreated?: () => void;
  onCommentDeleted?: () => void;
}

export default function Comments({
  postId,
  onCommentCreated,
  onCommentDeleted,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      try {
        const data = await getComments(postId);
        setComments(data);
      } finally {
        setLoading(false);
      }
    }

    loadComments();
  }, [postId]);

  async function handleCreate(content: string) {
    const newComment = await createComment(postId, content);
    setComments((prev) => [...prev, newComment]);
    onCommentCreated?.();
  }

  async function handleDelete(commentId: number) {
    await deleteComment(commentId);
    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentId)
    );
    onCommentDeleted?.();
  }

  async function handleEdit(commentId: number, content: string) {
    const updated = await updateComment(commentId, content);
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId ? updated : comment
      )
    );
  }

  if (loading) return <p className="comments-loading">Carregando comentários...</p>;

  return (
    <div className="comments">
      <CommentForm onSubmit={handleCreate} />

      <CommentList
        comments={comments}
        currentUser={currentUser}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
