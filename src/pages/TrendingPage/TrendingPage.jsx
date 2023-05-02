import React, { useState, useEffect } from "react";
import "./TrendingPage.css";
import axios from "axios";
import { motion } from "framer-motion";
import { MovieCard } from "../../components";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const TrendingPage = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPage = 100;

  useEffect(() => {
    const fetchTrending = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apikey}&page=${page}`
        )
        .then((response) => {
          setLoading(true);
          setTrending(response.data.results);
        });
    };
    setTimeout(() => {
      fetchTrending();
    }, 1000);
  }, [page]);

  const handlePageChange = (event, value) => {
    // event parameter is required
    setPage(value);
  };

  return (
    <>
      {loading ? (
        <motion.div className="movies">
          <Helmet>
            <title>StreamFlix | Trending Movies</title>
          </Helmet>
          <div className="movies_container">
            <div className="movies_topsection">
              <span className="movies_heading">Trending Movies</span>
              <div className="movies_buttons">
                <Pagination
                  count={totalPage}
                  onChange={handlePageChange}
                  shape="rounded"
                  size="small"
                  boundaryCount={1}
                  siblingCount={1}
                />
              </div>
            </div>
            {loading ? (
              <div className="movies_list">
                {trending?.map((item) => (
                  <MovieCard
                    key={item.id}
                    image={item.poster_path}
                    id={item.id}
                    type="movie"
                  />
                ))}
              </div>
            ) : (
              <div className="loading">
                <CircularProgress color="inherit" />
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="loading">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default TrendingPage;
