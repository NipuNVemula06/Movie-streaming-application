import React, { useState, useEffect } from "react";
import "./Popular.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { SeriesCard } from "../../components";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}`)
        .then((response) => {
          setPopular(response.data.results);
        });
    };

    fetchPopular();
  }, []);

  return (
    <div className="popular">
      <div className="popular_topsection">
        <span className="popular_heading">Popular Shows </span>
        <span className="popular_seeall">See All</span>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {popular?.map((item) => (
          <SwiperSlide key={item.id}>
            <SeriesCard image={item.poster_path} id={item.id} type="tv" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Popular;
