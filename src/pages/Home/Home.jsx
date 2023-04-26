import React from "react";
import "./Home.css";
import {
  Banner,
  Popularmovies,
  Toprated,
  Trendingmovies,
  Upcoming,
} from "../../components";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Trendingmovies />
      <Popularmovies />
      <Toprated />
      <Upcoming />
    </div>
  );
};

export default Home;
