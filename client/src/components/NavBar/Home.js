import React from "react";
import { NavLink } from "react-router-dom";
import { getUsername, isSignedIn } from "../AuthService";

export default function Home() {
  return (
    <NavLink
      className="NavBarItem title is-6 has-text-info"
      activeStyle={{
        borderBottom: "3px solid #3273dc"
      }}
      to={isSignedIn() ? `/home/${getUsername()}` : "/home"}
    >
      HOME
    </NavLink>
  );
}
