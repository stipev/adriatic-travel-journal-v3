import React from "react";
import { NavLink } from "react-router-dom";
import { getUsername, isSignedIn } from "../AuthService";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <NavLink
        className="title is-6 navbar-item has-background-info"
        style={{ margin: 0, color: "white" }}
        activeStyle={{
          color: "yellow",
          borderBottom: "2px solid yellow"
        }}
        to={isSignedIn() ? `/home/${getUsername()}` : "/home"}
      >
        HOME
      </NavLink>
    </div>
  );
}
