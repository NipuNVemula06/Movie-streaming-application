import React, { useState, useEffect } from "react";
import "./Similar.css";
import axios from "axios";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/original";

const Similar = ({ id, mediatype }) => {
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();
  const type = mediatype;

  useEffect(() => {
    const fetchSimilar = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/${mediatype}/${id}/similar?api_key=${apikey}`
        )
        .then((response) => {
          setSimilar(response.data.results);
        });
    };
    fetchSimilar();
  }, []);

  const handleClick = (id) => {
    if (mediatype === "movie") {
      navigate(`/movie/${id}`, {
        state: {
          mediatype: type,
        },
      });
    }
    if (mediatype === "tv") {
      navigate(`/series/${id}`, {
        state: {
          mediatype: type,
        },
      });
    }
  };
  return (
    <div className="similar">
      {similar && (
        <>
          <span className="similar_heading">Similar to this</span>
          <Swiper
            spaceBetween={10}
            slidesPerView={2}
            scrollbar={{ draggable: true }}
            mousewheel={true}
            modules={[Mousewheel, Scrollbar]}
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
            {similar?.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="similar_content">
                  {item.poster_path ? (
                    <img
                      src={`${baseURL}${item.poster_path}`}
                      alt={item.title}
                      className="similar_image"
                      onClick={() => handleClick(item.id)}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x350.png?text=No+Image"
                      alt="No_Image"
                      className="similar_image"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default Similar;
