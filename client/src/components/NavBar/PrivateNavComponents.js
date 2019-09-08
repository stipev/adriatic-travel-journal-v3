import React from "react";
import { NavLink } from "react-router-dom";
import { isSignedIn, signOut } from "../AuthService";
import Home from "./Home";

class PrivateNavComponents extends React.Component {
  render() {
    return (
      <div className="NavBar" id="navBar">
        {isSignedIn() ? <Home /> : null}

        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          to="/profile"
        >
          PROFILE
        </NavLink>
        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          to="/reviews"
        >
          REVIEWS
        </NavLink>
        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          to="/prizes"
        >
          PRIZES
        </NavLink>

        <NavLink
          className="title is-6 has-text-info NavBarItem"
          onClick={() => {
            signOut();
          }}
          to="/signin"
        >
          SIGN OUT
        </NavLink>
      </div>
    );
  }
}

export default PrivateNavComponents;
