import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Genres,
  Home,
  MovieDetails,
  Movies,
  NotFound,
  Person,
  PopularPage,
  TopRatedPage,
  TrendingPage,
  Tvseries,
  TvseriesDetails,
  UpcomingPage,
} from "./pages";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial="false">
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/series/:id" element={<TvseriesDetails />} />
        <Route path="/tvseries" element={<Tvseries />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/toprated" element={<TopRatedPage />} />
        <Route path="/person/:id" element={<Person />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
