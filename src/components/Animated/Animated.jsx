import React, { useState, useEffect } from "react";
import "./Animated.css";
import axios from "axios";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "..";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Animated = () => {
  const [animated, setAnimated] = useState([]);

  useEffect(() => {
    const fetchAnimated = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&with_genres=16`
        )
        .then((response) => {
          console.log(response.data.results);
          setAnimated(response.data.results);
        });
    };

    fetchAnimated();
  }, []);
  return (
    <div className="animated">
      <div className="animated_topsection">
        <span className="animated_heading">Animation Shows</span>
        <span className="animated_seeall">See All</span>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        scrollbar={{ draggable: true }}
        mousewheel={true}
        modules={[Mousewheel, Scrollbar]}
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
      >
        {animated?.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard
              image={item.poster_path}
              title={item.title}
              id={item.id}
              mediaType={item.media_type}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Animated;
