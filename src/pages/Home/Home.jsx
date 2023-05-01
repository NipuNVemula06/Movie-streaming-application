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
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>StreamFlix</title>
      </Helmet>
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
