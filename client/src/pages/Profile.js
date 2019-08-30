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
import uuidv4 from "uuid/v4";

import { connect } from "react-redux";
import { addCode, setAllCodes, setUserReviews } from "../actions/actions";
const URL = "http://localhost:8000/review/add";
const USER_REVIEWS_URL = "http://localhost:8000/review/user";
const USER_DELETE_URL = "http://localhost:8000/reviews";
const USER_CODES_URL = "http://localhost:8000/code/user";

class Profile extends React.Component {
  getUserReviews = () => {
    axios({
      method: "post",
      url: USER_REVIEWS_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      data: {
        userId: getId()
      },
      credentials: "same-origin"
    })
      .then(res => this.props.setUserReviews(res.data.userReviews))
      .catch(error => console.log("error: ", error));
  };

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
        this.getAllUserCodes();
      })
      .catch(err => console.log("error", err));
  };

  getAllUserCodes = () => {
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
      this.getUserReviews();
    });
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

  editReview = () => {
    console.log("EDIT REVIEW");
  };

  deleteReview = code => {
    axios({
      method: "delete",
      url: USER_DELETE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      data: {
        code
      },
      //
      credentials: "same-origin"
    })
      .then(res => {
        console.log("delete review res: ", res);
        Promise.all([this.getUserReviews(), this.getAllUserCodes()]);
      })
      .catch(error => console.log("error: ", error));
  };

  render() {
    let { userReviews } = this.props.state.reviewReducer;
    console.log("REVIEW REDUCER ERR: ", this.props.state.reviewReducer);
    console.log("USER REVIEWS ERR:", userReviews);
    console.log("DULJINA USER REVIEWS ERR:", userReviews.length);
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
          <div className="box">
            <button onClick={this.getUserReviews}>My reviews</button>
            {userReviews.length > 0 ? (
              <div className="box">
                {" "}
                {userReviews.map(userReview => {
                  console.log("ACCCC: USER REVIEW:", userReview);
                  return (
                    <div key={uuidv4()} className="box">
                      <a
                        onClick={() => {
                          this.deleteReview(userReview.code);
                        }}
                        className="button is-danger is-outlined"
                      >
                        <span>Delete</span>
                        <span className="icon is-small">
                          <i className="fas fa-times"></i>
                        </span>
                      </a>
                      <a
                        onClick={() => {
                          this.editReview();
                        }}
                        className="button is-danger is-outlined"
                      >
                        <span>Edit</span>
                        <span className="icon is-small">
                          <i className="far fa-edit"></i>
                        </span>
                      </a>

                      <p>code:{userReview.code}</p>
                      <p>review:{userReview.review}</p>
                      <p>rate:{userReview.rate}</p>
                      <p>date:{userReview.date}</p>
                      <p>location:{userReview.location}</p>
                    </div>
                  );
                })}{" "}
              </div>
            ) : (
              <div className="box"> You don't have reviews yet </div>
            )}
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
    addCode: code => dispatch(addCode(code)),
    setAllCodes: codes => dispatch(setAllCodes(codes)),
    setUserReviews: reviews => dispatch(setUserReviews(reviews))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
