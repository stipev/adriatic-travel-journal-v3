import React from "react";
import Header from "./components/Header";
import PrivateHome from "./pages/PrivateHome";
import PublicHome from "./pages/PublicHome";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Prizes from "./pages/Prizes";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "../src/components/Routes";
//import { isLoggedIn } from "./components/AuthService";

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
            <PrivateRoute
              exact
              path="/home/:username"
              component={PrivateHome}
            />
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
