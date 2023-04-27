import { Footer, Header } from "./components";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Genres,
  Home,
  MovieDetails,
  Movies,
  MyList,
  Tvseries,
  TvseriesDetails,
} from "./pages";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="container">
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
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
