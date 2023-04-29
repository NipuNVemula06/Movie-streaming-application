import React from "react";
import "./SeriesCard.css";
import { useNavigate } from "react-router-dom";

const baseURL = "http://image.tmdb.org/t/p/w500";

const SeriesCard = ({ image, title, id, type }) => {
  const navigate = useNavigate();

  const gotoTVDetailsPage = () => {
    navigate(`/series/${id}`, {
      state: {
        mediatype: type,
      },
    });
  };
  return (
    <div className="seriescard" onClick={gotoTVDetailsPage}>
      <img src={`${baseURL}${image}`} alt={title} className="movie_image" />
    </div>
  );
};

export default SeriesCard;
