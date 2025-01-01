"use client";

import Slider from "react-slick";

import * as styles from "./PostCarousel.css";

import Post from "../post/Post";
import PrePost from "../../model/PrePost";
import { PrePostDataList } from "../../data/PrePostDataEx";

export default function PostCarousel() {
  const exampleData = PrePostDataList;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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
