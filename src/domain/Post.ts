export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  tags?: string[];
  twitter?: string;
  profile?: string;
  [key: string]: any;
}
