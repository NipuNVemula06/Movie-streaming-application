import React from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div className="notfound">
      <Helmet>
        <title>StreamFlix | Page Not Found</title>
      </Helmet>
      <img src="./assets/404.svg" alt="not-found" className="notfound_image" />
    </motion.div>
  );
};

export default NotFound;
