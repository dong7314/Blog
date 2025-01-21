import { Post } from "./Post.model";
import { User } from "./User.model";

export interface Series {
  id: number;
  title: string;
  description: string;
  author: User;
  posts: Post[];
  createdDate: Date;
  updatedDate: Date;
}
