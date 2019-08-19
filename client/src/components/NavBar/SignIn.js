import React from "react";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <NavLink
        to="/signin"
        onClick={() => {
          console.log("SIGN IN CLICK");
        }}
        className="title is-6 navbar-item has-background-info"
        style={{
          margin: 0,
          color: "white",
          cursor: "pointer",
          border: "none"
        }}
      >
        SIGN IN
      </NavLink>
    </div>
  );
}
