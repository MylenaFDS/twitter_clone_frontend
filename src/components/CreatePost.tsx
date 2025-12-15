import { useState } from "react";
import api from "../services/api";

export default function CreatePost({ onCreated }: { onCreated: () => void }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api.post("/posts/", { content });
    setContent("");
    onCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button>Postar</button>
    </form>
  );
}
