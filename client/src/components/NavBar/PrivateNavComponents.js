import React from "react";
import { NavLink } from "react-router-dom";
import { isSignedIn, signOut } from "../AuthService";
import { connect } from "react-redux";
import { _signOut } from "../../actions/actions";
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
            //  _signOut();
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

const mapDispatchToProps = dispatch => {
  return {
    _signOut: () => dispatch(_signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PrivateNavComponents);
