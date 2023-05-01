import React, { useState, useEffect } from "react";
import "./PopularPage.css";
import axios from "axios";
import { motion } from "framer-motion";
import { SeriesCard } from "../../components";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const PopularPage = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPage = 100;

  useEffect(() => {
    const fetchPopular = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&page=${page}`
        )
        .then((response) => {
          setLoading(true);
          setPopular(response.data.results);
        });
    };
    fetchPopular();
  }, [page]);

  const transitionDuration = loading ? 0.5 : 2;

  const handlePageChange = (event, value) => {
    // event parameter is required
    setPage(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: transitionDuration }}
      className="movies"
    >
      <Helmet>
        <title>StreamFlix | Popular Shows</title>
      </Helmet>
      <div className="movies_container">
        <div className="movies_topsection">
          <span className="movies_heading">Popular Shows</span>
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
            {popular?.map((item) => (
              <SeriesCard
                key={item.id}
                image={item.poster_path}
                id={item.id}
                type="tv"
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
  );
};

export default PopularPage;
