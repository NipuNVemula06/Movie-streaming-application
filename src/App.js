import { Footer, Header } from "./components";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Genres, Home, MovieDetails, Movies, Tvseries } from "./pages";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/tvseries" element={<Tvseries />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
