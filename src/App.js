import { Footer, Header } from "./components";
import "./App.css";
import AnimatedRoutes from "./AnimatedRoutes";
import { Scroll } from "./pages";

function App() {
  return (
    <div className="container">
      <Header />
      <AnimatedRoutes />
      <Footer />
      <Scroll />
    </div>
  );
}

export default App;
