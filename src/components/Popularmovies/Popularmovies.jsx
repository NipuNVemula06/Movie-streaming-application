import React, { useState, useEffect } from "react";
import "./Popularmovies.css";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "../../components";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Popularmovies = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
        .then((response) => {
          setPopular(response.data.results);
        });
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="popular">
      <div className="popular_topsection">
        <span className="popular_heading">Popular Movies</span>
        <span className="popular_seeall">See All</span>
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
        {popular?.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard
              image={item.poster_path}
              title={item.title}
              id={item.id}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Popularmovies;
