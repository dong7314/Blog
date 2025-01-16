import { User } from "./User.model";

export interface Comment {
  id: number;
  content: string;
  isSecret: boolean;
  author: User;
  replies: Comment[];
  createdDate: Date;
  updatedDate: Date;
}
