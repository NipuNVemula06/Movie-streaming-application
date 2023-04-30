import React from "react";
import "./EpisodeCard.css";
import { BsPlayCircle } from "react-icons/bs";

const baseURL = "http://image.tmdb.org/t/p/original";

const EpisodeCard = ({
  id,
  image,
  episodeNumber,
  title,
  runtime,
  overview,
  airDate,
}) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const checkAirdate = () => {
    if (currentDate > airDate) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="episode_content">
      <div className="episode_number">{episodeNumber}</div>
      <div className="episode_image_container">
        {image ? (
          <div className="episode_image_hover">
            <img
              src={`${baseURL}${image}`}
              alt="episode_title"
              className="episode_image"
            />
            <span className="episode_playbutton">
              <BsPlayCircle className="episode_playicon" />
            </span>
          </div>
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
          {runtime && <p className="episode_runtime">{runtime}min</p>}
        </div>
        {checkAirdate() ? (
          <span className="episode_comingsoon">Coming Soon....</span>
        ) : (
          <span className="episode_desc">{overview}</span>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;
