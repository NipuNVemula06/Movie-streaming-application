import React, { useState, useEffect } from "react";
import "./Upcoming.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Upcoming = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcoming = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`)
        .then((response) => {
          setLoading(true);
          setUpcoming(response.data.results);
        });
    };
    setTimeout(() => {
      fetchUpcoming();
    }, 1000);
  }, []);

  return (
    <div className="upcoming">
      <div className="upcoming_topsection">
        <span className="upcoming_heading">Upcoming Movies</span>
        <span className="upcoming_seeall" onClick={() => navigate("/upcoming")}>
          See All
        </span>
      </div>
      {loading ? (
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
      ) : (
        <div className="loading">
          <CircularProgress color="inherit" />
        </div>
      )}
    </div>
  );
};

export default Upcoming;
