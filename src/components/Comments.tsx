import { useEffect, useState } from "react";

interface Comment {
  id: number;
  content: string;
  created_at: string;
  author: {
    id: number;
    username: string;
  };
}

interface Props {
  postId: number;
  onCommentCreated: () => void;
}

export default function Comments({ postId, onCommentCreated }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://127.0.0.1:9000/api/comments/?post=${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setComments);
  }, [postId, token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch("http://127.0.0.1:9000/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        post: postId,
      }),
    });

    const newComment = await res.json();

    setComments((prev) => [...prev, newComment]);
    setContent("");
    onCommentCreated(); // ✅ AVISA O TWEET
  }

  return (
    <div className="comments">
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tweetar resposta"
        />
      </form>

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <strong>@{comment.author.username}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
