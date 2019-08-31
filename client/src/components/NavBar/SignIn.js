import React from "react";
import { NavLink } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <NavLink
        to="/signin"
        className="NavBarItem title is-6 has-text-info "
        activeStyle={{
          borderBottom: "3px solid #3273dc"
        }}
      >
        SIGN IN
      </NavLink>
    </div>
  );
}
