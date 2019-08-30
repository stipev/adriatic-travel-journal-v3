import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { signUp } from "../components/AuthService";
import { setAllLocations, setPrizeTimer } from "../actions/actions";
const LOCATIONS_URL = "http://localhost:8000/location/all";
const PRIZE_TIMER_URL = "http://localhost:8000/prizeTimer";

class SignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    retypedPassword: "",
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
        this.getPrizeTimer();
      })
      .catch(err => console.log("error", err));
  }

  getPrizeTimer = () => {
    axios({
      method: "get",
      url: PRIZE_TIMER_URL,
      headers: {
        "Content-Type": "application/json"
      },

      credentials: "same-origin"
    })
      .then(prizeTimerData => {
        console.log("prizeTimerData", prizeTimerData.data.prizeTimer);
        this.props.setPrizeTimer(prizeTimerData.data.prizeTimer);
      })
      .catch();
  };

  signUp = () => {
    const password = this.state.password.trim();
    signUp(
      this.state.firstName,
      this.state.lastName,
      this.state.username,
      this.state.email,
      password,
      this.props.history
    )
      .then(res => this.setState({ message: res }))
      .catch(err => console.log("error: ", err));
  };

  updateFirstName = event => {
    this.setState({ firstName: event.target.value });
  };
  updateLastName = event => {
    this.setState({ lastName: event.target.value });
  };
  updateUsername = event => {
    this.setState({ username: event.target.value });
  };
  updateEmail = event => {
    this.setState({ email: event.target.value });
  };
  updatePassword = event => {
    this.setState({ password: event.target.value });
  };
  updateRetypedPassword = event => {
    this.setState({ retypedPassword: event.target.value });
  };

  render() {
    return (
      <div
        style={{
          marginTop: "50px",
          width: "300px"
        }}
      >
        <h5 className="title is-5 has-text-info	">{this.state.message}</h5>

        <div className="box">
          <div className="field">
            <label className="label ">First Name:</label>

            <div className="control">
              <input
                onChange={this.updateFirstName}
                className="input is-info is-small"
                type="text"
                placeholder="Enter your first name here..."
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Last Name:</label>

            <div className="control">
              <input
                onChange={this.updateLastName}
                className="input is-info is-small"
                type="text"
                placeholder="Enter your last name here..."
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Username:</label>

            <div className="control">
              <input
                onChange={this.updateUsername}
                className="input is-info is-small"
                type="text"
                placeholder="Enter username here..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">E-mail:</label>

            <div className="control">
              <input
                onChange={this.updateEmail}
                className="input is-info is-small"
                type="text"
                placeholder="Enter your e-mail here..."
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
          <div className="field">
            <label className="label">Retype Password:</label>

            <div className="control">
              <input
                onChange={this.updateRetypedPassword}
                className="input is-info is-small"
                type="text"
                placeholder="Retype password here..."
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <button onClick={this.signUp} className="button is-info">
              SIGN UP
            </button>
          </div>

          <NavLink
            style={{
              textDecoration: "underline",
              color: "#209cee",
              //border: "3px solid green",
              display: "flex",
              justifyContent: "center"
              //marginBottom: "300px"
            }}
            to="/signin"
          >
            Already have an account!?
          </NavLink>
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
    setAllLocations: locations => dispatch(setAllLocations(locations)),
    setPrizeTimer: prizeTimer => dispatch(setPrizeTimer(prizeTimer))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
