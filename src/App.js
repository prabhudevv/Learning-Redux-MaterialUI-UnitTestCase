import './App.css';
import Navigation from './components/Navigation/Navigation';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/components/Home';
import AddUser from './components/components/AddUser';

const App = () => {
  return (
    <Router>
      <Navigation>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/adduser/:userId' element={<AddUser />} />
        </Routes>
      </Navigation>
    </Router>
  );
}

export default App;