import React from "react";
import PrivateNavComponents from "./PrivateNavComponents";
import SignIn from "./SignIn";
import Home from "./Home";
import { isLoggedIn } from "../../components/AuthService";
//import { connect } from "react-redux";

class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {isLoggedIn() ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Home /> <PrivateNavComponents history={this.props.history} />{" "}
          </div>
        ) : null}

        {!isLoggedIn() &&
        (this.props.history.location.pathname === "/signin" ||
          this.props.history.location.pathname === "/signup") ? (
          <Home />
        ) : null}

        {!isLoggedIn() && this.props.history.location.pathname === "/home" ? (
          <SignIn />
        ) : null}
      </div>
    );
  }
}

export default NavBar;
