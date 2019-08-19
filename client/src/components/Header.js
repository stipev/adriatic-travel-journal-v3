import React from "react";
import NavBar from "./NavBar/NavBar";
import { withRouter } from "react-router-dom";
import { isSignedIn, getUsername } from "./AuthService";

class Header extends React.Component {
  componentDidMount() {
    if (this.props.history.location.pathname === "/" && isSignedIn()) {
      this.props.history.push(`/home/${getUsername()}`);
    } else if (this.props.history.location.pathname === "/" && !isSignedIn()) {
      this.props.history.push("/home");
    }
  }
  render() {
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
            <NavBar history={this.props.history} />
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Header);
