import React, { useState, useEffect } from "react";
import "./Movies.css";
import { motion } from "framer-motion";
import axios from "axios";
import { MovieCard } from "../../components";
import { Pagination } from "@mui/material";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const totalPage = 100;

  useEffect(() => {
    const fetchMovies = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&page=${page}`
        )
        .then((response) => {
          setMovies(response.data.results);
        });
    };
    fetchMovies();
  }, [page]);

  const handlePageChange = (event, value) => {
    // event parameter is required
    setPage(value);
  };
  return (
    <motion.div className="movies">
      <div className="movies_container">
        <div className="movies_topsection">
          <span className="movies_heading">Movies</span>
          <div className="movies_buttons">
            <Pagination
              count={totalPage}
              onChange={handlePageChange}
              shape="rounded"
              boundaryCount={1}
              siblingCount={1}
            />
          </div>
        </div>
        <div className="movies_list">
          {movies?.map((item) => (
            <MovieCard
              key={item.id}
              image={item.poster_path}
              title={item.title}
              id={item.id}
              mediaType={item.media_type}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Movies;
