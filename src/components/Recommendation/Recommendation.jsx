import React, { useState, useEffect } from "react";
import "./Recommendation.css";
import axios from "axios";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/original";

const Recommendation = ({ id, mediatype }) => {
  const [recommendation, setRecommendation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendation = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/${mediatype}/${id}/recommendations?api_key=${apikey}`
        )
        .then((response) => {
          setRecommendation(response.data.results);
        });
    };
    fetchRecommendation();
  }, []);

  const handleClick = (id, mediatype) => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="recommendation">
      <span className="recommendation_heading">More like this</span>
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
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {recommendation?.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="recommendation_content"
              onClick={() => handleClick(item.id, item.media_type)}
            >
              <img
                src={`${baseURL}${item.poster_path}`}
                alt={item.title}
                className="recommendation_image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommendation;
