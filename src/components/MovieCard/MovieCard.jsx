import React from "react";
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCard = ({ image, title, id, type, loading }) => {
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
      {/* {loading ? (
        
      ) : (
        <Skeleton height={450} baseColor="#dee2e6" highlightColor="#ced4da" />
      )} */}
    </div>
  );
};

export default MovieCard;
