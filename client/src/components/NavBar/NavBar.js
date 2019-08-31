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
      <div
      //className="NavBar" //style={{ display: "flex", flexDirection: "row" }}
      >
        {isSignedIn() ? (
          <div
            className="NavBarContainer"
            id="navs"
            //style={{ display: "flex", flexDirection: "row" }}
          >
            <Home /> <PrivateNavComponents history={this.props.history} />
          </div>
        ) : null}

        {!isSignedIn() &&
        (this.props.history.location.pathname === "/signin" ||
          this.props.history.location.pathname === "/signup") ? (
          <div className="NavBarContainer">
            <Home />
          </div>
        ) : null}

        {!isSignedIn() && this.props.history.location.pathname === "/home" ? (
          <div className="NavBarContainer">
            <SignIn />
          </div>
        ) : null}
      </div>
    );
  }
}

export default NavBar;
