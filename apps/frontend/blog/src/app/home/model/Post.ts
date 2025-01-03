export default interface PrePost {
  id: number;
  title: string;
  postDescription: string;
  content: string;
  author: string;
  likes: number;
  comment: number;
  tags: string[];
  thumbnail: string;
  createdDate: Date;
}
