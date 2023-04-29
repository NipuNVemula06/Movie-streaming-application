import React from "react";
import "./Home.css";
import {
  Banner,
  Toprated,
  Trending,
  Upcoming,
  Popular,
} from "../../components";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div>
      <Banner />
      <div className="home">
        <Trending />
        <Toprated />
        <Upcoming />
        <Popular />
      </div>
    </motion.div>
  );
};

export default Home;
