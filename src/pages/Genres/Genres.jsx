import React, { useEffect, useState } from "react";
import "./Genres.css";
import { motion } from "framer-motion";
import { GenreCard, MovieCard } from "../../components";
import axios from "axios";
import { Pagination } from "@mui/material";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Genres = () => {
  const [content, setContent] = useState([]);
  const [mediatype, setMediaType] = useState("movie");
  const [genretype, setGenreType] = useState("");
  const [genreID, setGenreID] = useState("");
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
          setContent(response.data.results);
        });
    };
    fetchContent();
  }, [genreID, mediatype, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <motion.div className="genres">
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
                boundaryCount={1}
                siblingCount={1}
              />
            </div>
          </div>
          <div className="genres_listcontainer">
            {content?.map((item) => (
              <MovieCard
                image={item.poster_path}
                title={item.title}
                id={item.id}
                mediaType={item.media_type}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Genres;
