import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { BsBookmark, BsBookmarkFill, BsShare } from "react-icons/bs";
import { Cast, Recommendation } from "../../components";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);

  const baseURL = "http://image.tmdb.org/t/p/original";
  // `https://api.themoviedb.org/3/${location.state.media}/${id}?api_key=${apikey}`

  useEffect(() => {
    const fetchMovieDetails = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
        .then((response) => {
          setMovie(response.data);
          setGenres(response.data.genres);
        });
    };
    fetchMovieDetails();
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
    <motion.div className="moviedetails">
      <div className="moviedetails_imagecontainer">
        <img
          src={`${baseURL}${movie.backdrop_path}`}
          alt={id}
          className="moviedetails_backdrop_image"
        />
        <div className="moviedetails_titleonimagecontainer">
          <span className="moviedetails_titleonimage">{movie.title}</span>
        </div>
      </div>
      <div className="moviedetails_container">
        <div className="moviedetails_content">
          <div className="moviedetails_postercontainer">
            <img
              src={`${baseURL}${movie.poster_path}`}
              alt={id}
              className="moviedetails_poster"
            />
          </div>
          <div className="moviedetails_contentcontainer">
            <div className="moviedetails_titlecontainer">
              <span className="moviedetails_title">{movie.title}</span>
              <span className="moviedetails_releasedate">
                ( {movie.release_date?.split("-")[0]} )
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
              <div className="moviedetails_watchtrailerbutton">
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
        <div>
          <Cast id={id} />
        </div>
        <div>
          <Recommendation id={id} />
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;
