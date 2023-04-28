import React, { useState, useEffect } from "react";
import "./Trending.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "..";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Trending = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`)
        .then((response) => {
          setTrending(response.data.results);
        });
    };

    fetchTrending();
  }, []);
  return (
    <div className="trending">
      <div className="trending_topsection">
        <span className="trending_heading">Trending Now</span>
        <span className="trending_seeall">See All</span>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
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
        {trending?.map((item) => (
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

export default Trending;
