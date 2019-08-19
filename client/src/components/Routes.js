import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isSignedIn, getUsername } from "../components/AuthService";

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isSignedIn() && restricted ? (
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
        isSignedIn() ? <Component {...props} /> : <Redirect to="/home" />
      }
    />
  );
};
