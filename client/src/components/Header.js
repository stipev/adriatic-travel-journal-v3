import React from "react";
import NavBar from "./NavBar/NavBar";
import { withRouter } from "react-router-dom";
import { isSignedIn, getUsername } from "./AuthService";
import anchor from "../assets/anchor.png";
import journal from "../assets/journal.png";
import "../css/Header.css";

class Header extends React.Component {
  onMenuClick = () => {
    let navBar = document.getElementById("navBar");

    if (navBar.style.display === "none") {
      navBar.style.display = "flex";
      navBar.style.flexDirection = "column";
    } else {
      navBar.style.display = "none";
    }
  };

  componentDidMount() {
    if (this.props.history.location.pathname === "/" && isSignedIn()) {
      this.props.history.push(`/home/${getUsername()}`);
    } else if (this.props.history.location.pathname === "/" && !isSignedIn()) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="Header">
        <div className="TitleAndNavBarContainer">
          <div className="TitleWithMenuButton">
            <div className="TitleWithIconContainer">
              <h3
                className="Title title is-3 has-text-info"
                style={{ margin: "0rem" }}
              >
                ADRIATIC
                <div className="TitleTravel">TRAVEL</div>
                <div className="TitleJournal">JOURNAL</div>
              </h3>
              <div className="IconContainer">
                <img className="IconAnchor" src={anchor} alt="anchor icon" />
                <img className="IconJournal" src={journal} alt="journal icon" />
              </div>
            </div>
            {isSignedIn() ? (
              <div className="MenuButton ">
                <button onClick={this.onMenuClick} className="button is-link">
                  MENU
                </button>
              </div>
            ) : null}
          </div>
          <NavBar history={this.props.history} />
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
