import React, { useEffect, useState } from "react";
import "./Search.css";
import { AiOutlineClose } from "react-icons/ai";
import { CircularProgress, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/w500";

const Search = ({ setSearch }) => {
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchContent = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=${apikey}&query=${query}`
        )
        .then((response) => {
          setLoading(true);
          const result = response.data.results;
          const filteredResults = result?.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          );
          setResult(filteredResults);
        });
    };
    setTimeout(() => {
      searchContent();
    }, 1000);
  }, [queryResult]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery !== "") {
      setQueryResult(searchQuery);
    }
  };

  const gotoDetailsPage = (id, media_type) => {
    if (media_type === "movie") {
      navigate(`/movie/${id}`, {
        state: {
          mediatype: media_type,
        },
      });
    }
    if (media_type === "tv") {
      navigate(`/series/${id}`, {
        state: {
          mediatype: media_type,
        },
      });
    }
    setSearch(false);
  };

  return (
    <div className="search">
      <div className="search_container">
        <div className="search_topsection">
          <AiOutlineClose
            className="search_close"
            onClick={() => setSearch(false)}
          />
        </div>
        <div className="search_inputcontainer">
          <form onSubmit={handleSubmit} className="search_form">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              className="search_input"
              placeholder="Search for movies or tv series"
            />
            <input
              type="submit"
              value="search"
              className="search_submitbutton"
            />
          </form>
          {loading ? (
            <div className="search_resultcontainer">
              {result?.map((item) => (
                <div key={item.id} className="search_resultcard">
                  {item.poster_path ? (
                    <img
                      src={`${baseURL}${item.poster_path}`}
                      alt={item.title}
                      className="search_resultimage"
                      onClick={() => gotoDetailsPage(item.id, item.media_type)}
                    />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/300x450.png?text=${item.title}`}
                      alt={item.title}
                      className="search_resultnoimage"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="loading">
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
