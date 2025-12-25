import { useState } from "react";

interface Props {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: Props) {
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    onSubmit(content);
    setContent("");
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva um comentário"
      />
      <button>Comentar</button>
    </form>
  );
}

