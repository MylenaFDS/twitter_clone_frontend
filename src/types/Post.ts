export interface Post {
  id: number;
  content: string;
  author: {
    id: number;
    username: string;
  };
  created_at: string;
}
