import React, { useState, useEffect } from "react";
import "./Trending.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { MovieCard } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikey}`
        )
        .then((response) => {
          setLoading(true);
          setTrending(response.data.results);
        });
    };
    setTimeout(() => {
      fetchTrending();
    }, 1000);
  }, []);
  return (
    <div className="trending">
      <div className="trending_topsection">
        <span className="trending_heading">Trending Movies</span>
        <span className="trending_seeall" onClick={() => navigate("/trending")}>
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
          {trending?.map((item) => (
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

export default Trending;
