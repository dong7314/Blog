"use client";

import Slider from "react-slick";

import * as styles from "./PostCarousel.css";

import Post from "../post/Post";
import PrePost from "../../model/Post";
import { PrePostDataList } from "../../data/PrePostDataEx";
import { PostNextArrow, PostPrevArrow } from "./arrow/PostArrows";

export default function PostCarousel() {
  const exampleData = PrePostDataList;

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
      {exampleData.map((data: PrePost) => {
        return (
          <div key={data.id} className={styles.postContainer}>
            <Post data={data} />
          </div>
        );
      })}
    </Slider>
  );
}
