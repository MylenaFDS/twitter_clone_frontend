export interface Tweet {
  id: number;
  content: string;
  created_at: string;
  likes_count: number;
  liked?: boolean;
  comments_count: number;
  author: {
    id: number;
    username: string;
    avatar: string | null;
  };
}


