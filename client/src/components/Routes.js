import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoggedIn, getUsername } from "../components/AuthService";

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  //console.log("all params", rest.path);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() && restricted ? (
          <Redirect to={`/home/${getUsername()}`} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};
