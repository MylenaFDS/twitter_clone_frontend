import api from "./api";
import type { Tweet } from "../types/Tweet";

interface CreateTweetPayload {
  content: string;
}

export async function createTweet(
  payload: CreateTweetPayload
): Promise<Tweet> {
  const response = await api.post("/posts/", payload);
  return response.data;
}

export async function getTweets(): Promise<Tweet[]> {
  const response = await api.get<Tweet[]>("/posts/");
  return response.data;
}

export async function toggleLike(postId: number) {
  const response = await api.post(`/posts/${postId}/like/`);
  return response.data;
}
