import React, { useState, useEffect } from "react";
import "./Cast.css";
import axios from "axios";
import { Avatar } from "@mui/material";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const baseURL = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchCastDetails = async () => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
        )
        .then((response) => {
          // GET THE FIRST 5 MAIN CAST MEMBERS
          const cast = response.data.cast;
          const mainCast = cast
            .filter((member) => member.order <= 5) // get the first 5 main cast members
            .map((member) => ({
              id: member.id,
              name: member.name,
              character: member.character,
              profilePath: member.profile_path,
            }));
          setCast(mainCast);

          // GET THE DIRECTOR INFO
          const crew = response.data.crew;
          const directors = crew.filter(
            (member) => member.department === "Directing"
          );
          const directorNames = directors.map((director) => ({
            id: director.id,
            name: director.name,
            profilePath: director.profile_path,
          }));
          setDirector(directorNames[0]);
        });
    };

    fetchCastDetails();
  }, []);
  return (
    <div className="cast">
      <div className="cast_heading">Cast & Crew</div>
      <span className="cast_director">Director</span>
      <div className="cast_content">
        <Avatar
          src={`${baseURL}${director.profilePath}`}
          alt={director.name}
          className="cast_image"
          variant="square"
          sx={{
            width: "180px",
            height: "180px",
          }}
        />
        <span className="cast_name">{director.name}</span>
      </div>
      <span className="cast_starring">Starring</span>
      <div className="cast_container">
        {cast?.map((member) => (
          <div key={member.id} className="cast_content">
            <Avatar
              src={`${baseURL}${member.profilePath}`}
              alt={member.name}
              className="cast_image"
              variant="square"
              sx={{
                width: "180px",
                height: "180px",
              }}
            />
            <span className="cast_name">{member.name}</span>
            <span className="cast_character">
              <span>as</span> {member.character}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
