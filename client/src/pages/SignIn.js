import React from "react";
import { NavLink } from "react-router-dom";
//import axios from "axios";
import { signIn, getToken } from "../components/AuthService";
import { connect } from "react-redux";
import { setAllLocations } from "../actions/actions";
import axios from "axios";
const LOCATIONS_URL = "http://localhost:8000/location/all";

class SignIn extends React.Component {
  state = {
    usernameEmail: "",
    password: "",
    message: " Fill input fields with your data:"
  };

  componentDidMount() {
    axios({
      method: "get",
      url: LOCATIONS_URL,
      headers: {
        "Content-Type": "application/json"
      },

      credentials: "same-origin"
    })
      .then(res => {
        this.props.setAllLocations(res.data.locations);
      })
      .catch(err => console.log("error", err));
  }

  signIn = () => {
    signIn(this.state.usernameEmail, this.state.password, this.props.history)
      .then(res => this.setState({ message: res }))
      .catch(err => console.log("error: ", err));
  };

  updateUsernameEmail = event => {
    this.setState({ usernameEmail: event.target.value });
  };
  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    //console.log("this.state: ", this.state);
    return (
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column"
          //border: "3px solid black"
        }}
      >
        <h5 className="title is-5 has-text-info	">{this.state.message}</h5>
        <div
          style={
            {
              //marginTop: "100px",
              //            border: "3px solid red"
            }
          }
        >
          <div
            className="box"
            style={
              {
                //maxWidth: "300px"
              }
            }
          >
            <div className="field">
              <label className="label">Username/E-mail:</label>

              <div className="control">
                <input
                  onChange={this.updateUsernameEmail}
                  className="input is-info is-small"
                  type="text"
                  placeholder="Enter username/email here..."
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password:</label>

              <div className="control">
                <input
                  onChange={this.updatePassword}
                  className="input is-info is-small"
                  type="text"
                  placeholder="Enter password here..."
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <button onClick={this.signIn} className="button is-info">
                SIGN IN
              </button>
            </div>

            <NavLink
              style={{
                textDecoration: "underline",
                color: "#209cee",
                display: "flex",
                justifyContent: "center"
                //      marginBottom: "300px"
              }}
              to="/signup"
            >
              Don't have an account yet!?
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //setAllCodes: codes => dispatch(setAllCodes(codes)),
    setAllLocations: locations => dispatch(setAllLocations(locations))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
