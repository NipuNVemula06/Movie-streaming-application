import React from "react";
import "./EpisodeCard.css";

const baseURL = "http://image.tmdb.org/t/p/original";

const EpisodeCard = ({
  id,
  image,
  episodeNumber,
  title,
  runtime,
  overview,
}) => {
  return (
    <div className="episode_content">
      <div className="episode_number">{episodeNumber}</div>
      <div className="episode_image_container">
        {image ? (
          <img
            src={`${baseURL}${image}`}
            alt="episode_title"
            className="episode_image"
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x450.png?text=No+Image"
            alt="No_Image"
            className="default_image"
          />
        )}
      </div>
      <div className="episode_details">
        <div className="episode_details_top">
          <h2 className="episode_title">{title}</h2>
          <p className="episode_runtime">{runtime}min</p>
        </div>
        <span className="episode_desc">{overview}</span>
      </div>
    </div>
  );
};

export default EpisodeCard;
