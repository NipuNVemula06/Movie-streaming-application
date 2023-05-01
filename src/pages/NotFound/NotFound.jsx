import React from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <title>StreamFlix | Page Not Found</title>
      </Helmet>
      <img src="./assets/404.svg" alt="not-found" className="notfound_image" />
    </motion.div>
  );
};

export default NotFound;
