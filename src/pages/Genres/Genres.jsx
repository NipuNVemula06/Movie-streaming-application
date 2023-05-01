import React, { useEffect, useState } from "react";
import "./Genres.css";
import { motion } from "framer-motion";
import { GenreCard, MovieCard, SeriesCard } from "../../components";
import axios from "axios";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Genres = () => {
  const [content, setContent] = useState([]);
  const [mediatype, setMediaType] = useState("movie");
  const [genretype, setGenreType] = useState("");
  const [genreID, setGenreID] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const totalPage = 100;

  const handleMediaChange = (e) => {
    setMediaType(e.target.value);
  };

  useEffect(() => {
    const fetchContent = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/${mediatype}?api_key=${apikey}&with_genres=${genreID}&page=${page}`
        )
        .then((response) => {
          setLoading(true);
          setContent(response.data.results);
        });
    };
    setTimeout(() => {
      fetchContent();
    }, 1000);
  }, [genreID, mediatype, page]);

  const transitionDuration = loading ? 0.5 : 2;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <motion.div
      className="genres"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: transitionDuration }}
    >
      <Helmet>
        <title>StreamFlix | Genres</title>
      </Helmet>
      <div className="genres_container">
        <div className="genres_topsection">
          <span className="genres_heading">Genres</span>
          <div className="genres_mediatype">
            <select onChange={handleMediaChange}>
              <option value="movie">Movies</option>
              <option value="tv">Tv Series</option>
            </select>
          </div>
        </div>
        <div>
          <GenreCard
            mediaType={mediatype}
            genretype={genretype}
            setGenreType={setGenreType}
            setGenreID={setGenreID}
          />
        </div>
        <div>
          <div className="genre_bottomsection">
            <div>
              {genretype && (
                <>
                  {mediatype === "movie" && (
                    <span className="genres_listtype">{genretype} Movies</span>
                  )}
                </>
              )}
              {genretype && (
                <>
                  {mediatype === "tv" && (
                    <span className="genres_listtype">
                      {genretype} TV Series
                    </span>
                  )}
                </>
              )}
            </div>
            <div>
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
          <div className="genres_listcontainer">
            {content?.map((item) => (
              <div key={item.id}>
                {mediatype === "movie" && (
                  <MovieCard
                    image={item.poster_path}
                    id={item.id}
                    type="movie"
                  />
                )}
                {mediatype === "tv" && (
                  <SeriesCard image={item.poster_path} id={item.id} type="tv" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Genres;
