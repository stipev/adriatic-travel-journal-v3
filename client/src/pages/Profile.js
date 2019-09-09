import React from "react";
import {
  getToken,
  getUsername,
  getFirstName,
  getLastName,
  getEmail,
  getId
} from "../components/AuthService";
import axios from "axios";
import uuidv4 from "uuid/v4";
import { connect } from "react-redux";
import { addCode, setAllCodes, setUserReviews } from "../actions/actions";
import "../css/Profile.css";

const REVIEWS_URL = "http://localhost:8000/reviews";
const CODES_URL = "http://localhost:8000/codes";

class Profile extends React.Component {
  state = {
    message: "Input review data here:",
    editMode: false,
    editCode: "code",
    code: "",
    review: "",
    rate: "",
    stars: [
      { value: 1, isActive: false },
      { value: 2, isActive: false },
      { value: 3, isActive: false },
      { value: 4, isActive: false },
      { value: 5, isActive: false }
    ]
  };

  componentDidMount() {
    this.getUserReviews();
  }

  codeValidator = () => {
    let { code } = this.state;
    code = code.trim();
    if (code.length > 9 && code.length < 15) {
      return true;
    } else {
      this.setState({
        message: "Code need to have more than 9 and less than 15 characters"
      });
      return false;
    }
  };

  reviewValidator = () => {
    let { review } = this.state;
    review = review.trim();
    if (review.length <= 200) {
      return true;
    } else {
      this.setState({
        message: "Review need to have less than 200 characters"
      });
      return false;
    }
  };

  rateValidator = () => {
    if (typeof this.state.rate === "string") {
      this.setState({ message: "Please rate your review" });
      return false;
    } else if (typeof this.state.rate === "number") {
      return true;
    }
  };

  getUserReviews = () => {
    axios({
      method: "get",
      url: `${REVIEWS_URL}/${getId()}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      credentials: "same-origin"
    })
      .then(res => {
        this.props.setUserReviews(res.data.userReviews);
      })
      .catch(error => console.log("error: ", error));
  };

  updateCode = event => {
    this.setState({ code: event.target.value });
  };
  updateReview = event => {
    this.setState({ review: event.target.value });
  };

  submitReview = () => {
    if (
      this.codeValidator() &&
      this.reviewValidator() &&
      this.rateValidator()
    ) {
      let { code } = this.state;
      let { review } = this.state;
      code = code.trim();
      review = review.trim();

      axios({
        method: "post",
        url: REVIEWS_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken()
        },
        data: {
          code,
          userId: getId(),
          username: getUsername(),
          review: review.length === 0 ? "Review not posted yet!" : review,
          rate: this.state.rate
        },

        credentials: "same-origin"
      })
        .then(res => {
          if (res.data.success.success) {
            this.setState({ message: "Review submitted successfully!" });
          } else {
            this.setState({ message: "Invalid code!" });
          }
          this.getAllUserCodes();
        })
        .catch(err => console.log("error", err));
    }
  };

  getAllUserCodes = () => {
    axios({
      method: "get",
      url: `${CODES_URL}/${getId()}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
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

  deleteReview = code => {
    axios({
      method: "delete",
      url: REVIEWS_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      data: {
        code
      },

      credentials: "same-origin"
    }).then(res => {
      if (res.data.success) {
        Promise.all([this.getUserReviews(), this.getAllUserCodes()]).then(
          () => {
            this.setState({ message: "Review deleted successfully!" });
          }
        );
      } else {
        this.setState({ message: "Error while deleting review!" });
      }
    });
  };

  editReview = code => {
    this.setState({
      message: "Edit review here:",
      editMode: true,
      editCode: code
    });
  };

  submitReviewEdit = () => {
    if (this.reviewValidator() && this.rateValidator()) {
      let { review } = this.state;
      review = review.trim();

      axios({
        method: "patch",
        url: REVIEWS_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken()
        },
        data: {
          userId: getId(),
          code: this.state.editCode,
          review: review.length === 0 ? "Review not posted yet!" : review,
          rate: this.state.rate
        },

        credentials: "same-origin"
      })
        .then(res => {
          console.log("res: ", res.data.success.success);
          if (res.data.success.success) {
            this.setState({ message: " Review updated successfully!" });
          } else {
            this.setState({ message: "Error while updating review!" });
          }
          this.getUserReviews();
          this.setState({
            editMode: false,
            message: "Review updated successfully!"
          });
        })
        .catch(err => console.log("error", err));
    }
  };

  onCodeListClick = () => {
    let codeList = document.getElementById("codeList");

    if (codeList.style.display === "none") {
      codeList.style.display = "flex";
      codeList.style.flexDirection = "column";
    } else {
      codeList.style.display = "none";
    }
  };

  onReviewListClick = () => {
    let reviewList = document.getElementById("reviewList");

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
                                </p>
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
          <h5
            style={{ minHeight: "67px" }}
            className="title is-5 has-text-info	"
          >
            {this.state.message}
          </h5>

          <div className="field">
            <label className="label">Code :</label>

            <div className="control">
              {this.state.editMode ? (
                <input
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
            onClick={() => {
              this.state.editMode
                ? this.submitReviewEdit()
                : this.submitReview();
            }}
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
    setUserReviews: reviews => dispatch(setUserReviews(reviews))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
