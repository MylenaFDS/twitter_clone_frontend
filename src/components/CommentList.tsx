import { useState } from "react";
import type { Comment } from "../types/Comment";
import "../styles/comments.css"
interface Props {
  comments: Comment[];
  currentUser: string | null;
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

export default function CommentList({
  comments,
  currentUser,
  onDelete,
  onEdit,
}: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  function startEdit(comment: Comment) {
    setEditingId(comment.id);
    setEditContent(comment.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditContent("");
  }

  function saveEdit(commentId: number) {
    if (!editContent.trim()) return;
    onEdit(commentId, editContent);
    cancelEdit();
  }

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <strong>@{comment.author.username}</strong>

          {editingId === comment.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />

              <div className="comment-actions">
                <button onClick={() => saveEdit(comment.id)}>Salvar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <p>{comment.content}</p>

              {comment.author.username === currentUser && (
                <div className="comment-actions">
                  <button onClick={() => startEdit(comment)}>✏️</button>
                  <button onClick={() => onDelete(comment.id)}>🗑️</button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
