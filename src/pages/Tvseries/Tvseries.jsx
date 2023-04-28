import React, { useState, useEffect } from "react";
import "./Tvseries.css";
import { motion } from "framer-motion";
import axios from "axios";
import { MovieCard } from "../../components";
import { Pagination } from "@mui/material";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Tvseries = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);

  const totalPage = 100;

  useEffect(() => {
    const fetchSeries = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&sort_by=popularity.desc&page=${page}`
        )
        .then((response) => {
          setSeries(response.data.results);
        });
    };
    fetchSeries();
  }, [page]);

  const handlePageChange = (event, value) => {
    // event parameter is required
    setPage(value);
  };

  return (
    <motion.div className="series">
      <div className="series_container">
        <div className="series_topsection">
          <span className="series_heading">TV Series</span>
          <div className="series_buttons">
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
        <div className="series_list">
          {series?.map((item) => (
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

export default Tvseries;
