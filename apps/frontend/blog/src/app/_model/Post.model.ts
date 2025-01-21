import { User } from "./User.model";
import { Tag } from "./Tag.model";
import { Like } from "./Like.model";
import { Comment } from "./Comment.model";
import { Series } from "./Series.model";

export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  author: User;
  tags: Tag[];
  likes: Like[];
  comments: Comment[];
  series: Series;
  seriesOrder: number | null;
  viewCount: number | null;
  createdDate: Date;
  updatedDate: Date;
}
