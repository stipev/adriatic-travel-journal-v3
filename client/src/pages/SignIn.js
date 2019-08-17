import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:8000/signin";

class SignIn extends React.Component {
  state = {
    usernameEmail: "",
    password: "",
    message: " Fill input fields with your data:"
  };

  signIn = () => {
    axios({
      method: "post",
      url: URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username: this.state.usernameEmail,
        password: this.state.password
      },
      //
      credentials: "same-origin"
    })
      .then(res => {
        this.setState({ message: "bolje nediraj nista" });
        //console.log("res: ", res);
        console.log("res:", res.data);
      })
      .catch();
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
          marginTop: "100px"

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

export default SignIn;
