export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  seriesOrder: number;
  viewCount: number;
  createdDate: Date;
  updatedDate: Date;
}
