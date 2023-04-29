import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { BsBookmark, BsShare } from "react-icons/bs";
import { Cast, Similar, Trailer } from "../../components";
import CircularProgress from "@mui/material/CircularProgress";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const media_type = location?.state.mediatype;
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watchtrailer, setWatchTrailer] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
        .then((response) => {
          setLoading(true);
          setMovie(response.data);
          setGenres(response.data.genres);
        });
    };
    setTimeout(() => {
      fetchMovieDetails();
    }, 1000);
  }, []);

  const runTime = (runtime) => {
    // convert the run time into hours and minute
    const num = runtime;
    const hours = Math.floor(num / 60); // Calculate the number of hours
    const minutes = num % 60; // Calculate the number of minutes
    const time = `${hours} h ${minutes} m`;
    return time;
  };

  return (
    <>
      {loading ? (
        <motion.div className="moviedetails">
          <div className="moviedetails_imagecontainer">
            <img
              src={`${baseURL}${movie.backdrop_path}`}
              alt={id}
              className="moviedetails_backdrop_image"
            />
            <div className="moviedetails_titleonimagecontainer">
              <span className="moviedetails_titleonimage">
                {movie.original_title}
              </span>
            </div>
          </div>
          <div className="moviedetails_container">
            <div className="moviedetails_content">
              <div className="moviedetails_postercontainer">
                <img
                  src={`${baseURL}${movie?.poster_path}`}
                  alt={id}
                  className="moviedetails_poster"
                />
              </div>
              <div className="moviedetails_contentcontainer">
                <div className="moviedetails_titlecontainer">
                  <span className="moviedetails_title">
                    {movie.title} -
                    <span className="moviedetails_releasedate">
                      {movie.release_date?.split("-")[0]}
                    </span>
                  </span>
                </div>
                <div className="moviedetails_runtimecontainer">
                  <span>Runtime - </span> <span>{runTime(movie.runtime)}</span>
                </div>
                <div className="moviedetails_genres">
                  {genres?.map((item) => (
                    <span key={item.id} className="moviedetails_genre">
                      {item.name}
                    </span>
                  ))}
                </div>
                <span className="moviedetails_desc">{movie.overview}</span>
                <div className="moviedetails_buttons">
                  <div
                    className="moviedetails_watchtrailerbutton"
                    onClick={() => setWatchTrailer(true)}
                  >
                    <span>Watch Trailer</span>
                    <FiPlay size={20} />
                  </div>
                  <div className="moviedetails_bookmark">
                    <BsBookmark className="moviedetails_bookmarkicon" />
                  </div>
                  <div className="moviedetails_share">
                    <BsShare className="moviedetails_shareicon" />
                  </div>
                </div>
              </div>
            </div>
            <Cast id={id} mediatype={media_type} />
            <Similar id={id} mediatype={media_type} />
          </div>
          {watchtrailer && (
            <Trailer
              id={id}
              setWatchTrailer={setWatchTrailer}
              mediatype={media_type}
            />
          )}
        </motion.div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
