import React, { useState, useEffect } from "react";
import "./Cast.css";
import axios from "axios";
import { Avatar } from "@mui/material";

const apikey = process.env.REACT_APP_API_SECRET_KEY;

const Cast = ({ id, mediatype }) => {
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const baseURL = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        axios
          .get(
            `https://api.themoviedb.org/3/${mediatype}/${id}/credits?api_key=${apikey}`
          )
          .then((response) => {
            // GET THE FIRST 5 MAIN CAST MEMBERS
            const cast = response.data.cast;
            setCast(cast.slice(0, 10));

            // GET THE DIRECTOR INFO
            const crew = response.data.crew;
            const director = crew?.find(
              (member) => member.known_for_department === "Directing"
            );
            if (director) {
              const directorDetails = {
                id: director.id,
                name: director.name,
                profilePath: director.profile_path,
              };
              setDirector(directorDetails);
            }
          });
      } catch (err) {
        console.log(err);
      }
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
            width: "160px",
            height: "160px",
            borderRadius: "2px",
          }}
        />
        <span className="cast_name">{director.name}</span>
      </div>
      {cast && (
        <>
          <span className="cast_starring">Starring</span>
          <div className="cast_container">
            {cast?.map((member) => (
              <div key={member.id} className="cast_content">
                <Avatar
                  src={`${baseURL}${member.profile_path}`}
                  alt={member.name}
                  className="cast_image"
                  variant="square"
                  sx={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "2px",
                  }}
                />
                <span className="cast_name">{member.name}</span>
                {member.character && (
                  <span className="cast_character">
                    <span>as</span> {member.character}
                  </span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cast;
