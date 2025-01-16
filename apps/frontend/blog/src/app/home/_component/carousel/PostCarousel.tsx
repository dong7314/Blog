"use client";

import Slider from "react-slick";

import * as styles from "./PostCarousel.css";

import Post from "../post/Post";
import { Post as IPost } from "@/app/_model/Post.model";
import { PostNextArrow, PostPrevArrow } from "./arrow/PostArrows";

type Props = {
  posts: IPost[];
};
export default function PostCarousel({ posts }: Props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <PostNextArrow />,
    prevArrow: <PostPrevArrow />,
  };

  return (
    <Slider {...settings}>
      {posts &&
        posts.map((post: IPost) => {
          return (
            <div
              key={`${post?.title}-${post?.id}`}
              className={styles.postContainer}
            >
              <Post data={post} />
            </div>
          );
        })}
    </Slider>
  );
}
