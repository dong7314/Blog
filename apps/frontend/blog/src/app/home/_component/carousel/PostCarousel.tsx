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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {exampleData.map((data: PrePost) => {
          return <Post key={data.id} data={data} />;
        })}
      </Slider>
    </div>
  );
}
