import React from "react";
import Comments from "./Comments";

interface PostProps {
  id: number;
  author: string;
  content: string;
  likes: number;
  onLike: (id: number) => void;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  likes,
  onLike,
}) => {
  return (
    <div className="post">
      <h4 className="post-author">{author}</h4>

      <p className="post-content">{content}</p>

      <button
        className="post-like-button"
        onClick={() => onLike(id)}
      >
        ❤️ Like ({likes})
      </button>

      {/* Container de comentários */}
      <Comments postId={id} />
    </div>
  );
};

export default Post;


