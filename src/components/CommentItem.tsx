import { useState } from "react";
import type { Comment } from "../types/Comment";

interface Props {
  comment: Comment;
  currentUser: string | null;
  onDelete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
}

export default function CommentItem({
  comment,
  currentUser,
  onDelete,
  onEdit,
}: Props) {
  const isAuthor = comment.author.username === currentUser;
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);

  function handleSave() {
    onEdit(comment.id, content);
    setEditing(false);
  }

  return (
    <div className="comment">
      <strong>@{comment.author.username}</strong>

      {editing ? (
        <>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <p>{comment.content}</p>
      )}

      {isAuthor && !editing && (
        <div className="comment-actions">
          <button onClick={() => setEditing(true)}>✏️</button>
          <button onClick={() => onDelete(comment.id)}>🗑️</button>
        </div>
      )}
    </div>
  );
}
