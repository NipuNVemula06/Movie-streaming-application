import React, { useState, useEffect } from "react";
import "./Toprated.css";
import axios from "axios";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { SeriesCard } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Toprated = () => {
  const [toprated, setToprated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToprated = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}`)
        .then((response) => {
          setLoading(true);
          setToprated(response.data.results);
        });
    };
    fetchToprated();
  }, []);

  return (
    <div className="toprated">
      <div className="toprated_topsection">
        <span className="toprated_heading">Top Rated Shows</span>
        <span className="toprated_seeall" onClick={() => navigate("/toprated")}>
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
          {toprated?.map((item) => (
            <SwiperSlide key={item.id}>
              <SeriesCard image={item.poster_path} id={item.id} type="tv" />
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

export default Toprated;
