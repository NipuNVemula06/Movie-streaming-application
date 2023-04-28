import React, { useState, useEffect } from "react";
import "./Trailer.css";
import axios from "axios";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Trailer = ({ id, setWatchTrailer }) => {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    const fetchTrailer = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`
        )
        .then((response) => {
          const videos = response.data.results;
          const getTrailer = videos.filter((video) => video.type === "Trailer");
          const getOfficalTrailer = getTrailer.filter(
            (trailer) => trailer.name === "Official Trailer"
          );
          setTrailer(getOfficalTrailer[0]);
        });
    };
    fetchTrailer();
  }, []);
  return (
    <div className="trailer">
      <div className="trailer_container">
        <div className="trailer_goback" onClick={() => setWatchTrailer(false)}>
          Go Back
        </div>
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={trailer.name}
            className="trailer_video"
          ></iframe>
        ) : (
          <div className="trailer_unavailable">
            Trailer unavailable at the moment. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Trailer;
