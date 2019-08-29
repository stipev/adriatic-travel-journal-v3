import React from "react";
import axios from "axios";
import { getToken } from "../components/AuthService";
import { setAllReviews } from "../actions/actions";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";

const REVIEWS_URL = "http://localhost:8000/review/all";

class Reviews extends React.Component {
  componentDidMount() {
    axios({
      method: "get",
      url: REVIEWS_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },
      credentials: "same-origin"
    })
      .then(res => {
        this.props.setAllReviews(res.data.reviews);
      })
      .catch(err => console.log("error", err));
  }

  render() {
    let { reviews } = this.props.reviewReducer;
    return (
      <div style={{ marginTop: "200px", border: "3px solid red" }}>
        {reviews.map(review => {
          return (
            <div key={uuidv4()} className="box">
              <p> username: {review.username} </p>
              <p> rate: {review.rate} </p>
              <p> review: {review.review} </p>
              <p> location: {review.location} </p>
              <p> date: {review.date} </p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { reviewReducer } = state;
  return {
    reviewReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAllReviews: reviews => dispatch(setAllReviews(reviews))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reviews);
