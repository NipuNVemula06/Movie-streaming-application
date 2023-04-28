import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ image, title, id, mediaType }) => {
  const baseURL = "http://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  const gotoMovieDetailsPage = () => {
    if (mediaType === "movie") {
      navigate(`/movie/${id}`, {
        state: {
          media: mediaType,
        },
      });
    }
    if (mediaType === "tv") {
      navigate(`/series/${id}`, {
        state: {
          media: mediaType,
        },
      });
    }
  };
  return (
    <div className="moviecard" onClick={gotoMovieDetailsPage}>
      <img src={`${baseURL}${image}`} alt={title} className="movie_image" />
      {/* <div className="movie_content">
        <h4 className="movie_title">{title}</h4>
      </div> */}
    </div>
  );
};

export default MovieCard;
