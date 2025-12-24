import type { User } from "./User";

export interface Comment {
  id: number;
  author: User;
  post: number;
  content: string;
  created_at: string;
}
