import React from "react";
import "./NotFound.css";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <div className="notfound">
      <Helmet>
        <title>StreamFlix | Page Not Found</title>
      </Helmet>
      <img src="./assets/404.svg" alt="not-found" className="notfound_image" />
    </div>
  );
};

export default NotFound;
