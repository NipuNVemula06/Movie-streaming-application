import React, { useEffect, useState } from "react";
import "./Episodes.css";
import { Divider } from "@mui/material";
import EpisodeCard from "../EpisodeCard/EpisodeCard";
import axios from "axios";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Episodes = ({ seasons, id }) => {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [seasonnumber, setSeasonnumber] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  const handleSeason = (e) => {
    setSelectedSeason(e.target.options[e.target.selectedIndex].label);
    setSeasonnumber(e.target.value);
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonnumber}?api_key=${apikey}`
        )
        .then((response) => {
          setEpisodes(response.data.episodes);
        });
    };
    fetchEpisodes();
  }, [selectedSeason]);

  return (
    <div className="episodes">
      <div className="episodes_topsection">
        <h3>Episodes</h3>
        <div className="seasons">
          <select onChange={handleSeason}>
            <option value="">Select a season</option>
            {seasons.map((item) => (
              <option
                key={item.id}
                value={item.season_number}
                label={item.name}
              ></option>
            ))}
          </select>
        </div>
      </div>
      <Divider />
      <div className="episodes_container">
        {selectedSeason && <h4>{selectedSeason}</h4>}
        {episodes?.map((item) => (
          <EpisodeCard
            key={item.id}
            id={item.id}
            episodeNumber={item.episode_number}
            title={item.name}
            overview={item.overview}
            runtime={item.runtime}
            image={item.still_path}
          />
        ))}
        {selectedSeason && <Divider />}
      </div>
    </div>
  );
};

export default Episodes;
