import React from "react";
import { NavLink } from "react-router-dom";
import { signIn } from "../components/AuthService";
import { connect } from "react-redux";
import { setAllLocations, setPrizeTimer } from "../actions/actions";
import axios from "axios";
import "../css/SignIn.css";

const LOCATIONS_URL = "http://localhost:8000/locations";
const PRIZE_TIMER_URL = "http://localhost:8000/timers";

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
        this.getPrizeTimer();
        this.props.setAllLocations(res.data.locations);
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
        let dateNow = new Date(Date.now()).getTime();
        if (dateNow < parseInt(prizeTimerData.data.expirationDate)) {
          this.props.setPrizeTimer(
            parseInt(prizeTimerData.data.expirationDate)
          );
        }
      })
      .catch();
  };

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
    return (
      <div className="SignInContainer">
        <div className="Message">
          <h5 className="title is-5 has-text-info	">{this.state.message}</h5>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="box">
            <div className=" field">
              <label className="label">Username/E-mail:</label>

              <div className="control">
                <input
                  onChange={this.updateUsernameEmail}
                  className=" input is-info is-small"
                  type="text"
                  placeholder="Enter username/email here..."
                />
              </div>
            </div>

            <div className=" field">
              <label className="label">Password:</label>

              <div className="control">
                <input
                  onChange={this.updatePassword}
                  className=" input is-info is-small"
                  type="password"
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
    setAllLocations: locations => dispatch(setAllLocations(locations)),
    setPrizeTimer: prizeTimer => dispatch(setPrizeTimer(prizeTimer))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
