import React from "react";
import NavBar from "./NavBar/NavBar";
import { withRouter } from "react-router-dom";
import { isSignedIn, getUsername } from "./AuthService";
import anchor from "../assets/anchor.png";
import journal from "../assets/journal.png";

class Header extends React.Component {
  onMenuClick = () => {
    //var x = document.getElementsByClassName("NavBarContainer");
    var x = document.getElementById("navs");

    console.log("x", x);
    //console.log("y", y);
    //console.log("MENU CLICKED");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
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
                //className="Title"
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
            <div
              //style={{ display: "none" }}
              className="MenuButton "
            >
              <button onClick={this.onMenuClick} className="button is-link">
                MENU
              </button>
            </div>
          </div>
          <NavBar history={this.props.history} />
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
