import { CommentDao } from './comment.dao';

export interface CustomCommentDao {
  comments: CommentDao[];
  count: number;
}
