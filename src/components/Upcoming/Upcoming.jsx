import React, { useState, useEffect } from "react";
import "./Upcoming.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "../../components";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`)
        .then((response) => {
          setUpcoming(response.data.results);
        });
    };

    fetchUpcoming();
  }, []);

  return (
    <div className="upcoming">
      <div className="upcoming_topsection">
        <span className="upcoming_heading">Upcoming Movies</span>
        <span className="upcoming_seeall">See All</span>
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
        {upcoming?.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard image={item.poster_path} id={item.id} type="movie" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Upcoming;
