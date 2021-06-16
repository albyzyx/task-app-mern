import "./App.css";
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Loading from "./components/Loading.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/load">
          <Loading />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
