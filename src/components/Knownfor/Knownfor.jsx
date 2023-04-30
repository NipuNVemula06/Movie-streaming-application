import React, { useState, useEffect } from "react";
import "./Knownfor.css";
import axios from "axios";
import { Mousewheel, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/original";

const Knownfor = ({ id }) => {
  const [knownfor, setKnownfor] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchKnowfor = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apikey}`
        )
        .then((response) => {
          const cast = response.data.cast;
          const filterResult = cast.filter(
            (result) => result.poster_path !== null
          );
          setKnownfor(filterResult);
        });
    };
    fetchKnowfor();
  }, []);

  const handleNavigation = (id, type) => {
    if (type === "movie") {
      navigate(`/movie/${id}`, {
        state: {
          mediatype: type,
        },
      });
    }
    if (type === "tv") {
      navigate(`/series/${id}`, {
        state: {
          mediatype: type,
        },
      });
    }
  };
  return (
    <>
      {knownfor && (
        <div className="knownfor">
          <span className="knownfor_heading">Known for</span>
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
            {knownfor.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="knownfor_card">
                  {item.poster_path ? (
                    <img
                      src={`${baseURL}${item.poster_path}`}
                      alt=""
                      className="knownfor_image"
                      onClick={() => handleNavigation(item.id, item.media_type)}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x350.png?text=No+Image"
                      alt="No_Image"
                      className="knownfor_image"
                    />
                  )}
                  <span>
                    as{" "}
                    <span className="person_playedcharacter">
                      {item.character}
                    </span>
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Knownfor;
