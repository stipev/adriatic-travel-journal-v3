import React from "react";
import {
  getToken,
  getUsername,
  getFirstName,
  getLastName,
  getEmail,
  getId
} from "../components/AuthService";
import UserCodes from "../components/Profile/UserCodes";
import axios from "axios";
import { connect } from "react-redux";
import { addCode, setAllCodes } from "../actions/actions";
const URL = "http://localhost:8000/review/add";
const USER_CODES_URL = "http://localhost:8000/code/user";

class Profile extends React.Component {
  state = {
    message: "Input review data here:",
    code: "",
    review: "",
    rate: "",
    stars: [
      { value: 1, isActive: false, isHover: false, cursorPointer: false },
      { value: 2, isActive: false, isHover: false, cursorPointer: false },
      { value: 3, isActive: false, isHover: false, cursorPointer: false },
      { value: 4, isActive: false, isHover: false, cursorPointer: false },
      { value: 5, isActive: false, isHover: false, cursorPointer: false }
    ]
  };

  updateCode = event => {
    this.setState({ code: event.target.value });
  };
  updateReview = event => {
    this.setState({ review: event.target.value });
  };

  submitReview = () => {
    let code = this.state.code.trim();
    console.log("post");
    axios({
      method: "post",
      url: URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      data: {
        code,
        userId: getId(),
        username: getUsername(),
        review: this.state.review,
        rate: this.state.rate
      },
      //
      credentials: "same-origin"
    })
      .then(res => {
        console.log("resss axios", res);

        axios({
          method: "post",
          url: USER_CODES_URL,
          headers: {
            "Content-Type": "application/json",
            Authorization: getToken()
          },
          data: {
            userId: getId()
          },

          credentials: "same-origin"
        }).then(res => {
          this.props.setAllCodes(res.data);
        });
      })
      .catch(err => console.log("error", err));
  };

  onStarClick = value => {
    let _stars = this.state.stars;
    let stars = _stars.map(star => {
      for (let i = 0; i < 5; i++) {
        if (star.value <= value) {
          star.isActive = true;
        } else {
          star.isActive = false;
        }
      }
      return star;
    });
    this.setState({ stars, rate: value });
  };

  render() {
    return (
      <div
        className="box"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "10rem"
          }}
        >
          <div>HELLO {getUsername()} </div>
          <div>First name: {getFirstName()}</div>
          <div>Last name: {getLastName()}</div>
          <div>E-mail: {getEmail()}</div>
        </div>
        <UserCodes />
        <div
          className="box"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h5 className="title is-5 has-text-info	">{this.state.message}</h5>

          <div className="field">
            <label className="label">Code :</label>

            <div className="control">
              <input
                onChange={this.updateCode}
                className="input is-info is-small"
                type="text"
                placeholder="Enter code here..."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Review :</label>

            <div className="control">
              <textarea
                onChange={this.updateReview}
                className="textarea is-info"
                placeholder="Write review..."
              />
            </div>
            <div className="field">
              <label className="label">Rate :</label>
              <div>
                {this.state.stars.map(star => {
                  return (
                    <i
                      key={star.value}
                      style={{ cursor: "pointer" }}
                      className={
                        star.isActive
                          ? "fas fa-star icon has-text-info"
                          : "far fa-star icon has-text-info"
                      }
                      onClick={() => {
                        this.onStarClick(star.value);
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <button onClick={this.submitReview} className="button is-info">
            SUBMIT REVIEW
          </button>
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
    addCode: code => dispatch(addCode(code)),
    setAllCodes: codes => dispatch(setAllCodes(codes))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
