import React from "react";
import Header from "./components/Header";
import PrivateHome from "./pages/PrivateHome";
import PublicHome from "./pages/PublicHome";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Prizes from "./pages/Prizes";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../src/components/Routes";
import "./App.css";

//import { isLoggedIn } from "./components/AuthService";

function App() {
  return (
    <div className="SiteContainer">
      <Router>
        <Header />
        <div className="CenterContainer">
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute
              exact
              path="/home/:username"
              component={PrivateHome}
            />
            <PrivateRoute exact path="/reviews" component={Reviews} />
            <PrivateRoute exact path="/prizes" component={Prizes} />
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
            <PublicRoute
              restricted={true}
              exact
              path="/home"
              component={PublicHome}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
