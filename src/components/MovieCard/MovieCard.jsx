import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ image, title, id, type }) => {
  const baseURL = "http://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();

  const gotoMovieDetailsPage = () => {
    navigate(`/movie/${id}`, {
      state: {
        mediatype: type,
      },
    });
  };
  return (
    <div className="moviecard" onClick={gotoMovieDetailsPage}>
      <img src={`${baseURL}${image}`} alt={title} className="movie_image" />
    </div>
  );
};

export default MovieCard;
