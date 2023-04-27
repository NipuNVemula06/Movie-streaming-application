import React from "react";
import "./Home.css";
import {
  Banner,
  Toprated,
  Trending,
  Upcoming,
  Popular,
  Animated,
} from "../../components";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div>
      <Banner />
      <div className="home">
        <Trending />
        <Popular />
        <Animated />
        <Toprated />
        <Upcoming />
      </div>
    </motion.div>
  );
};

export default Home;
