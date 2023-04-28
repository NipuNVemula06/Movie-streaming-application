import React, { useState, useEffect } from "react";
import "./GenreCard.css";
import axios from "axios";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const GenreCard = ({ mediaType, setGenreType, genretype, setGenreID }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apikey}`
        )
        .then((response) => {
          setGenres(response.data.genres);
        });
    };
    fetchGenres();
  }, [mediaType]);

  const handleGenre = (id, name) => {
    setGenreID(id);
    setGenreType(name);
  };
  return (
    <div className="genrecard">
      {genres?.map((genre) => (
        <button
          onClick={() => handleGenre(genre.id, genre.name)}
          className={`${
            genretype === genre.name
              ? "genrecard_button genrecard_active "
              : "genrecard_button"
          }`}
          key={genre.id}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreCard;
