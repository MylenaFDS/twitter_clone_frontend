export interface Tweet {
  id: number;
  author: {
    id: number;
    username: string;
  };
  content: string;
  created_at: string;
  likes_count: number;
  liked?: boolean;
}

