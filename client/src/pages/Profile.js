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
import {
  addCode,
  setAllCodes,
  setUserReviews,
  markUnvisitedLocation
} from "../actions/actions";
import "../Profile.css";
const URL = "http://localhost:8000/review/add";
const URL_REVIEWS_UPDATE = "http://localhost:8000/reviews/update";
const USER_REVIEWS_URL = "http://localhost:8000/review/user";
const USER_DELETE_URL = "http://localhost:8000/reviews";
const USER_CODES_URL = "http://localhost:8000/code/user";

class Profile extends React.Component {
  componentDidMount() {
    this.getUserReviews();
  }

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
      .then(res => {
        console.log("pozvano");
        this.props.setUserReviews(res.data.userReviews);
      })
      .catch(error => console.log("error: ", error));
  };

  state = {
    message: "Input review data here:",
    editMode: false,
    editCode: "code",
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
      console.log("KODOVI POSTAVLJANJE");
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

      credentials: "same-origin"
    }).then(() => {
      console.log("BEFORE PROMISE CODES:", this.props.state);

      Promise.all([this.getUserReviews(), this.getAllUserCodes()]);
    });
  };

  editReview = code => {
    //console.log("EDIT REVIEW code: ", code);
    this.setState({
      message: "Edit review here:",
      editMode: true,
      editCode: code
    });
  };

  submitReviewEdit = () => {
    console.log("ETO GA RADI");
    axios({
      method: "patch",
      url: URL_REVIEWS_UPDATE,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      data: {
        code: this.state.editCode,
        userId: getId(),
        review: this.state.review,
        rate: this.state.rate
      },

      credentials: "same-origin"
    })
      .then(res => {
        console.log("resss axios", res);
        this.getUserReviews();
        this.setState({ editMode: false });
      })
      .catch(err => console.log("error", err));
  };

  onCodeListClick = () => {
    // console.log("CLICKEC");
    let codeList = document.getElementById("codeList");
    console.log("codeList display:", codeList.style.display);
    if (codeList.style.display === "none") {
      codeList.style.display = "flex";
      codeList.style.flexDirection = "column";
    } else {
      codeList.style.display = "none";
    }
  };

  onReviewListClick = () => {
    //console.log("review");
    let reviewList = document.getElementById("reviewList");
    //console.log("codeList display:", codeList.style.display);
    if (reviewList.style.display === "none") {
      reviewList.style.display = "flex";
      reviewList.style.flexDirection = "column";
    } else {
      reviewList.style.display = "none";
    }
  };
  profileCard = () => {
    return (
      <div className="ProfileCard">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <p className="subtitle is-6">Username: {getUsername()}</p>
              <p className="subtitle is-6">First Name: {getFirstName()}</p>
              <p className="subtitle is-6">Last Name: {getLastName()}</p>
              <p className="subtitle is-6">E-mail: {getEmail()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  codeListContainer = () => {
    let { codes } = this.props.state.codeReducer.userCodes;
    let userCodes = codes.codes;
    return (
      <div className="CodeListContainer">
        <button onClick={this.onCodeListClick} className="button is-link">
          CODE LIST
        </button>

        <div className="card">
          <div className="card-content">
            <div className="content">
              <strong>My codes:</strong>
              <div
                style={{ display: "none" }}
                id="codeList"
                className="CodeList"
              >
                {userCodes.length > 0 ? (
                  <div>
                    {userCodes.map(code => {
                      return (
                        <p className="box subtitle is-6" key={uuidv4()}>
                          {code.code}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <p className="subtitle is-6">No codes yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  reviewListContainer = () => {
    let { userReviews } = this.props.state.reviewReducer;
    console.log("userReviews", userReviews);
    return (
      <div className="ReviewListContainer">
        <button onClick={this.onReviewListClick} className="button is-link">
          REVIEW LIST
        </button>

        <div className="card">
          <div className="card-content">
            <div className="content">
              <strong>My reviews:</strong>
              <div
                style={{ display: "none" }}
                id="reviewList"
                className="ReviewList"
              >
                {userReviews.length > 0 ? (
                  <div>
                    {" "}
                    {userReviews.map(review => {
                      return (
                        <div key={uuidv4()} className="ReviewCard card">
                          <header className="card-header">
                            <div className="card-header-title">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <p>{review.code} </p>
                                <p>
                                  {review.rate}
                                  <i className="fas fa-star icon has-text-info"></i>
                                </p>{" "}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                this.deleteReview(review.code);
                              }}
                              className="button is-small is-danger is-outlined"
                            >
                              <span>Delete</span>
                              <span className="icon is-small">
                                <i className="fas fa-times"></i>
                              </span>
                            </button>
                            <button
                              onClick={() => {
                                this.editReview(review.code);
                              }}
                              className="button is-small is-danger is-outlined"
                            >
                              <span>Edit</span>
                              <span className="icon is-small">
                                <i className="far fa-edit"></i>
                              </span>
                            </button>
                          </header>
                          <div className="card-content">
                            <div className="content">{review.review}</div>
                          </div>
                          <footer className="card-footer">
                            <p className="card-footer-item">
                              location: {review.location}
                            </p>

                            <p href="#" className="card-footer-item">
                              date: {review.date}
                            </p>
                          </footer>
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
        </div>
      </div>
    );
  };

  reviewInputForm = () => {
    return (
      <div className="ReviewInputForm">
        <div
          className="box"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h5 className="title is-5 has-text-info	">{this.state.message}</h5>

          <div className="field">
            <label className="label">Code :</label>

            <div className="control">
              {this.state.editMode ? (
                <input
                  //onChange={this.updateCode}
                  className="input is-info is-small"
                  type="text"
                  value={this.state.editCode || "A"}
                />
              ) : (
                <input
                  onChange={this.updateCode}
                  className="input is-info is-small"
                  type="text"
                  placeholder="Enter code here..."
                />
              )}
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
          <button
            onClick={
              this.state.editMode ? this.submitReviewEdit : this.submitReview
            }
            className="button is-info"
          >
            {this.state.editMode ? (
              <div>EDIT REVIEW</div>
            ) : (
              <div>SUBMIT REVIEW</div>
            )}
          </button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="ProfilePageContainer">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.profileCard()}
          {this.reviewInputForm()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.reviewListContainer()}
          {this.codeListContainer()}
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
    setUserReviews: reviews => dispatch(setUserReviews(reviews)),
    markUnvisitedLocation: location => dispatch(markUnvisitedLocation(location))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
