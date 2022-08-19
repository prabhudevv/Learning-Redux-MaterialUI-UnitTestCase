import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import RouteLinks from "./routes/RouteLinks";

const App = () => {
  return (
    <Router>
      <Navigation>
        <RouteLinks />
        <Toaster position="bottom-right" />
      </Navigation>
    </Router>
  );
};

export default App;
