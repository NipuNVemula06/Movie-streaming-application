import { Footer, Header } from "./components";
import "./App.css";
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
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();

  return (
    <div className="container">
      <Header />
      <AnimatePresence initial="false">
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
      <Footer />
    </div>
  );
}

export default App;
