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
import { PrivateRoute, PublicRoute } from "../src/components/Routes";

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
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/reviews" component={Reviews} />
            <PrivateRoute exact path="/prizes" component={Prizes} />
            <PrivateRoute exact path="/about" component={About} />
            <PublicRoute
              restricted={true}
              exact
              path="/signup"
              component={SignUp}
            />
            <PublicRoute
              restricted={true}
              exact
              path="/signin"
              component={SignIn}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
