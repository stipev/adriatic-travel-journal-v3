import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "../AuthService";
import { connect } from "react-redux";
import { _signOut } from "../../actions/actions";

//const profile = "/profile";

class PrivateNavComponents extends React.Component {
  componentDidMount() {
    console.log("PRIVATE NAC MOUNTED");
  }

  render() {
    //console.log("this.props,", this.props.history.location.pathname);
    //    const { pathname } = this.props.history.location;

    //console.log("ISTINA ILI LAŽ WTF", pathname === profile);

    return (
      <div
        className="PrivateNavBar"
        //style={{ display: "flex", flexDirection: "row" }}
      >
        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          //style={{ margin: 0 }}
          //activeStyle={{
          // color: "yellow",
          //borderBottom: "2px solid yellow"
          // }}
          to="/profile"
        >
          PROFILE
        </NavLink>
        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          /*
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }} */
          to="/reviews"
        >
          REVIEWS
        </NavLink>
        <NavLink
          className="NavBarItem title is-6 has-text-info"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          /* 
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}
          */
          to="/prizes"
        >
          PRIZES
        </NavLink>
        <NavLink
          className=" has-text-info title is-6 NavBarItem"
          activeStyle={{
            borderBottom: "3px solid #3273dc"
          }}
          /*
          style={{ margin: 0, color: "white" }}
          activeStyle={{
            color: "yellow",
            borderBottom: "2px solid yellow"
          }}*/
          to="/about"
        >
          ABOUT
        </NavLink>

        <NavLink
          className="title is-6 has-text-info NavBarItem"
          onClick={() => {
            //  _signOut();
            signOut();
          }}
          to="/signin"
          /* 
          style={{
            margin: 0,
            color: "white",
            cursor: "pointer",
            border: "none"
          }} */
        >
          SIGN OUT
        </NavLink>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     state
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    _signOut: () => dispatch(_signOut())
    //setAllLocations: locations => dispatch(setAllLocations(locations))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PrivateNavComponents);
