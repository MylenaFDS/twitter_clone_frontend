import CommentItem from "./CommentItem";
import type { Comment } from "../types/Comment";

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
  if (comments.length === 0)
    return <p>Nenhum comentário ainda</p>;

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
