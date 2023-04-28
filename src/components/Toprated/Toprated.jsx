import React, { useState, useEffect } from "react";
import "./Toprated.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "../../components";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Toprated = () => {
  const [toprated, setToprated] = useState([]);

  useEffect(() => {
    const fetchToprated = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`)
        .then((response) => {
          setToprated(response.data.results);
        });
    };

    fetchToprated();
  }, []);

  return (
    <div className="toprated">
      <div className="toprated_topsection">
        <span className="toprated_heading">Top Rated Movies</span>
        <span className="toprated_seeall">See All</span>
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
        {toprated?.map((item) => (
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

export default Toprated;
