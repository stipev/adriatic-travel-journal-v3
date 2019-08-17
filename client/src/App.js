import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Prizes from "./pages/Prizes";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div
          style={{
            margin: "3rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
            //       border: "3px solid red"
          }}
        >
          <Switch>
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/reviews" component={Reviews} />
            <Route exact path="/prizes" component={Prizes} />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
