import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import "toastr2/dist/toastr.min.css";

import alert from "./components/HotToaster/HotToaster";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/components/Home";
import AddUser from "./components/components/AddUser";

const App = () => {
  return (
    <Router>
      <Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser/:userId" element={<AddUser />} />
        </Routes>
        <Toaster position="bottom-right" />
      </Navigation>
    </Router>
  );
};

export default App;
