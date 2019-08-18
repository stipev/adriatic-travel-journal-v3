import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <NavLink
        className="title is-6 navbar-item has-background-info"
        style={{ margin: 0, color: "white" }}
        activeStyle={{
          color: "yellow",
          borderBottom: "2px solid yellow"
        }}
        to="/home"
      >
        HOME
      </NavLink>

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
    </div>
  );
}
