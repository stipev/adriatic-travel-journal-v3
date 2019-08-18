import React from "react";
import NavBar from "./NavBar";
import { NavLink, withRouter } from "react-router-dom";
import { logOut, isLoggedIn } from "../components/AuthService";

class Header extends React.Component {
  render() {
    console.log("HEADER");
    return (
      <div>
        <nav className="navbar has-background-info is-fixed-top">
          <div
            style={{
              marginLeft: "3rem"
            }}
            className="navbar-brand"
          >
            <div className="navbar-item">
              <h3 className="title is-3" style={{ color: "yellow" }}>
                ADRIATIC TRAVEL JOURNAL
              </h3>
            </div>
          </div>
          <div
            className="navbar-end"
            style={{
              marginRight: "3rem"
            }}
          >
            <NavBar />
            <button
              onClick={() => {
                logOut(this.props.history);
              }}
              className="title is-6 navbar-item has-background-info"
              style={{
                border: "3px solid black",
                color: "white",
                cursor: "pointer",
                border: "none"
              }}
            >
              SIGN OUT
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Header);
