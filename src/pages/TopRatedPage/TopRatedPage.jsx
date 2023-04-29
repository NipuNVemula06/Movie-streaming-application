import React, { useState, useEffect } from "react";
import "./TopRatedPage.css";
import axios from "axios";
import { SeriesCard } from "../../components";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const TopRatedPage = () => {
  const [toprated, setToprated] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const totalPage = 100;

  useEffect(() => {
    const fetchToprated = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}&page=${page}`
        )
        .then((response) => {
          setLoading(true);

          setToprated(response.data.results);
        });
    };
    setTimeout(() => {
      fetchToprated();
    }, 1000);
  }, [page]);

  const handlePageChange = (event, value) => {
    // event parameter is required
    setPage(value);
  };

  return (
    <div className="movies">
      <div className="movies_container">
        <div className="movies_topsection">
          <span className="movies_heading">Top Rated Shows</span>
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
            {toprated?.map((item) => (
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
    </div>
  );
};

export default TopRatedPage;
