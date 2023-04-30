import { Footer, Header, Splashscreen } from "./components";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Genres,
  Home,
  MovieDetails,
  Movies,
  MyList,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (!splashShown) {
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("splashShown", true);
      }, 3000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Splashscreen />
      ) : (
        <>
          <Header />
          <AnimatePresence initial="false">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/series/:id" element={<TvseriesDetails />} />
              <Route path="/tvseries" element={<Tvseries />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/upcoming" element={<UpcomingPage />} />
              <Route path="/toprated" element={<TopRatedPage />} />
              <Route path="/person/:id" element={<Person />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
