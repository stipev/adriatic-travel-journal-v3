import React from "react";
import PrivateNavComponents from "./PrivateNavComponents";
import SignIn from "./SignIn";
import Home from "./Home";
import { isSignedIn } from "../../components/AuthService";
//import { connect } from "react-redux";

class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {isSignedIn() ? <PrivateNavComponents /> : null}

        {!isSignedIn() &&
        (this.props.history.location.pathname === "/signin" ||
          this.props.history.location.pathname === "/signup") ? (
          <div className="NavBar">
            <Home />
          </div>
        ) : null}

        {!isSignedIn() && this.props.history.location.pathname === "/home" ? (
          <div className="NavBar">
            <SignIn />
          </div>
        ) : null}
      </div>
    );
  }
}

export default NavBar;
