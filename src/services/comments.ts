import api from "./api";
import type { Comment } from "../types/Comment";

// 🔹 Buscar comentários de um tweet
export async function getComments(postId: number): Promise<Comment[]> {
  const res = await api.get(`/comments/?post=${postId}`);
  return res.data;
}

// 🔹 Criar comentário
export async function createComment(
  postId: number,
  content: string
): Promise<Comment> {
  const res = await api.post("/comments/", {
    post: postId,
    content,
  });
  return res.data;
}

// 🔹 Deletar comentário
export async function deleteComment(commentId: number): Promise<void> {
  await api.delete(`/comments/${commentId}/`);
}

// 🔹 Atualizar comentário
export async function updateComment(
  commentId: number,
  content: string
): Promise<Comment> {
  const res = await api.patch(`/comments/${commentId}/`, {
    content,
  });
  return res.data;
}
