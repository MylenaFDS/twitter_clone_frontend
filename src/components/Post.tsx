import React from "react";
import Comment from "./Comment";

interface PostProps {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: { id: number; author: string; content: string }[];
  onLike: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, author, content, likes, comments, onLike }) => {
  return (
    <div className="post">
      <h4>{author}</h4>
      <p>{content}</p>
      <button onClick={() => onLike(id)}>Like ({likes})</button>
      <div className="comments">
        {comments.map(c => (
          <Comment key={c.id} author={c.author} content={c.content} />
        ))}
      </div>
    </div>
  );
};

export default Post;


