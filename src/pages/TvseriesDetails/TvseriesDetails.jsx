import React, { useEffect, useState } from "react";
import "./TvseriesDetails.css";
import axios from "axios";
import { motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { BsBookmark, BsShare } from "react-icons/bs";
import { Cast, Episodes, Similar, Trailer } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";

const apikey = process.env.REACT_APP_API_SECRET_KEY;
const baseURL = "http://image.tmdb.org/t/p/original";

const TvseriesDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const media_type = location?.state.mediatype;
  const [series, setSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [watchtrailer, setWatchTrailer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      await axios
        .get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}`)
        .then((response) => {
          setLoading(true);
          setSeries(response.data);
          setGenres(response.data.genres);
          setSeasons(response.data.seasons);
        });
    };
    setTimeout(() => {
      fetchSeriesDetails();
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <motion.div>
          <Helmet>
            <title>{`StreamFlix | ${series.name}`}</title>
          </Helmet>
          <div className="seriesdetails">
            <div className="seriesdetails_imagecontainer">
              {series.backdrop_path ? (
                <img
                  src={`${baseURL}${series.backdrop_path}`}
                  alt={series.name}
                  className="seriesdetails_backdrop_image"
                />
              ) : (
                <div className="seriesdetails_nobackdrop_image"></div>
              )}
              <div className="seriesdetails_titleonimagecontainer">
                <span className="seriesdetails_titleonimage">
                  {series.original_name}
                </span>
              </div>
            </div>
            <div className="seriesdetails_container">
              <div className="seriesdetails_content">
                <div className="seriesdetails_postercontainer">
                  <img
                    src={`${baseURL}${series?.poster_path}`}
                    alt={series.name}
                    className="seriesdetails_poster"
                  />
                </div>
                <div className="seriesdetails_contentcontainer">
                  <div className="seriesdetails_titlecontainer">
                    <span className="seriesdetails_title">{series.name}</span>

                    <span className="seriesdetails_releasedate">
                      ( {series.last_air_date?.split("-")[0]} )
                    </span>
                  </div>
                  <p className="seriesdetails_tagline">{series.tagline}</p>
                  <div className="seriesdetails_genres">
                    {genres?.map((item) => (
                      <span key={item.id} className="seriesdetails_genre">
                        {item.name}
                      </span>
                    ))}
                  </div>
                  <span className="seriesdetails_desc">{series.overview}</span>
                  <div className="seriesdetails_buttons">
                    <div
                      className="seriesdetails_watchtrailerbutton"
                      onClick={() => setWatchTrailer(true)}
                    >
                      <span>Watch Trailer</span>
                      <FiPlay size={20} />
                    </div>
                    <div className="seriesdetails_bookmark">
                      <BsBookmark className="seriesdetails_bookmarkicon" />
                    </div>
                    <div className="seriesdetails_share">
                      <BsShare className="seriesdetails_shareicon" />
                    </div>
                  </div>
                </div>
              </div>

              {/*Episodes*/}
              <Episodes seasons={seasons} id={id} />
              <Cast id={id} mediatype={media_type} />
              <Similar id={id} mediatype={media_type} />
            </div>
            {watchtrailer && (
              <Trailer
                id={id}
                setWatchTrailer={setWatchTrailer}
                mediatype={media_type}
              />
            )}
          </div>
        </motion.div>
      ) : (
        <div className="loading">
          <CircularProgress color="inherit" />
        </div>
      )}
    </>
  );
};

export default TvseriesDetails;
