import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Profile from './components/Profile';
import Lobby from './components/Lobby';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = () => {

  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/lobby" element={<Lobby />}/>
            <Route path="/profile" element={<Profile />}/>
        </Routes>
    </Router>        
  );
}

export default App;
