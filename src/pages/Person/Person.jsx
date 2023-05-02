import React, { useState, useEffect } from "react";
import "./Person.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import { Knownfor } from "../../components";
import { Helmet } from "react-helmet";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/original";

const Person = () => {
  const [person, setPerson] = useState([]);
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readmore, setReadmore] = useState(true);
  const { id } = useParams();

  const toggleReadMore = () => {
    setReadmore(!readmore);
  };

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        await axios
          .get(`https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`)
          .then((response) => {
            setLoading(true);
            setPerson(response.data);
            if (response.data.gender === 1) {
              setGender("Female");
            } else if (response.data.gender === 2) {
              setGender("Male");
            } else {
              setGender(null);
            }
          });
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      fetchPersonDetails();
    }, 1000);
  }, []);

  return (
    <motion.div className="person">
      <div className="person_container">
        {loading ? (
          <>
            <Helmet>
              <title>{`StreamFlix | ${person.name}`}</title>
            </Helmet>
            <div className="person_topsection">
              <div className="person_imagecontainer">
                {person.profile_path ? (
                  <img
                    src={`${baseURL}${person.profile_path}`}
                    alt={person.name}
                    className="person_image"
                  />
                ) : (
                  <img
                    src={`https://via.placeholder.com/300x450.png?text=${person.name}`}
                    alt={person.name}
                    className="person_image"
                  />
                )}
              </div>
              <div className="person_basicdetails">
                <span className="person_name">{person.name}</span>
                {person.birthday && (
                  <span className="person_basicinfo">
                    Birthday -<p>{person.birthday}</p>
                  </span>
                )}
                {person.place_of_birth && (
                  <span className="person_basicinfo">
                    Place of birth -<p>{person.place_of_birth}</p>
                  </span>
                )}
                {gender && (
                  <span className="person_basicinfo">
                    Gender -<p>{gender}</p>
                  </span>
                )}
                {person.known_for_department && (
                  <span className="person_basicinfo">
                    Know for department -<p>{person.known_for_department}</p>
                  </span>
                )}
                {person.also_known_as.length !== 0 && (
                  <span className="person_basicinfo">
                    Also known as -<p>{person.also_known_as.join(" , ")}</p>
                  </span>
                )}
              </div>
            </div>
            {person.biography && (
              <div className="person_biographycontainer">
                <span className="person_biography">Biography</span>
                <p className="person_bio">
                  {readmore ? person.biography.slice(0, 150) : person.biography}
                  <span onClick={toggleReadMore} className="person_bioreadmore">
                    {readmore ? "...read more" : "show less"}
                  </span>
                </p>
              </div>
            )}
            <div className="person_bottomsection">
              <Knownfor id={id} />
            </div>
          </>
        ) : (
          <div className="loading">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Person;
