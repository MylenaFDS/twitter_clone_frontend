import React from "react";

interface CommentProps {
  author: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({ author, content }) => {
  return (
    <div className="comment">
      <strong>{author}</strong>: {content}
    </div>
  );
};

export default Comment;

