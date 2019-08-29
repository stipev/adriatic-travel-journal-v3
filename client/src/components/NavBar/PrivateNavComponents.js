import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "../AuthService";
import { connect } from "react-redux";
import { _signOut } from "../../actions/actions";

class PrivateNavComponents extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <NavLink
          className="title is-6 navbar-item has-background-info"
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}
          to="/profile"
        >
          PROFILE
        </NavLink>

        <NavLink
          className="title is-6 navbar-item has-background-info"
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}
          to="/reviews"
        >
          REVIEWS
        </NavLink>

        <NavLink
          className="title is-6 navbar-item has-background-info"
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}
          to="/prizes"
        >
          PRIZES
        </NavLink>

        <NavLink
          className="navbar-item has-background-info title is-6"
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}
          to="/about"
        >
          ABOUT
        </NavLink>

        <button
          onClick={() => {
            _signOut();
            signOut(this.props.history);
          }}
          className="title is-6 navbar-item has-background-info"
          style={{
            margin: 0,
            color: "white",
            cursor: "pointer",
            border: "none"
          }}
        >
          SIGN OUT
        </button>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     state
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    _signOut: () => dispatch(_signOut())
    //setAllLocations: locations => dispatch(setAllLocations(locations))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PrivateNavComponents);
