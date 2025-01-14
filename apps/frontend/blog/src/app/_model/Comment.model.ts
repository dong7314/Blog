export interface Comment {
  id: number;
  content: string;
  isSecret: boolean;
  author: any;
  replies: Comment[];
  createdDate: Date;
  updatedDate: Date;
}
