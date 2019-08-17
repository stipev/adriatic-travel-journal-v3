import React from "react";
import { NavLink, withRouter } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar has-background-info is-fixed-top">
          <div
            style={{
              marginLeft: "3rem"
            }}
            className="navbar-brand"
          >
            <div className="navbar-item">
              <h3 className="title is-3" style={{ color: "yellow" }}>
                ADRIATIC TRAVEL JOURNAL
              </h3>
            </div>
          </div>
          <div className="navbar-end" style={{ marginRight: "3rem" }}>
            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/home"
            >
              HOME
            </NavLink>

            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/profile"
            >
              PROFILE
            </NavLink>

            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/reviews"
            >
              REVIEWS
            </NavLink>

            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/prizes"
            >
              PRIZES
            </NavLink>

            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/about"
            >
              ABOUT
            </NavLink>

            <NavLink
              className="navbar-item has-background-info"
              style={{ color: "white" }}
              activeStyle={{
                color: "yellow",
                borderBottom: "2px solid yellow"
              }}
              to="/signup"
            >
              SIGN OUT
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Header);
