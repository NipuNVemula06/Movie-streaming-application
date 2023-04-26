import React, { useState, useEffect } from "react";
import "./MovieDetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);

  const baseURL = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
        .then((response) => {
          console.log(response.data);
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
    <div className="moviedetails">
      <div>
        <img
          src={`${baseURL}${movie.backdrop_path}`}
          alt={id}
          className="moviedetails_backdrop_image"
        />
      </div>
      <div className="moviedetails_overview">
        <span className="moviedetails_title">{movie?.title}</span>
        <span className="moviedetails_desc">{movie?.overview}</span>
        <span>{movie.release_date?.split("-")[0]}</span>
        <span>{runTime(movie.runtime)}</span>
      </div>
      <div className="moviedetails_genres">
        {genres?.map((item) => (
          <span key={item.id} className="moviedetails_genre">
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
