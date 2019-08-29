import React from "react";
import axios from "axios";
import { getToken } from "../components/AuthService";
import { setAllReviews } from "../actions/actions";
import { connect } from "react-redux";

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
        //console.log("REVIEWS axios", res.data.reviews);
        this.props.setAllReviews(res.data.reviews);
      })
      .catch(err => console.log("error", err));
  }

  render() {
    //console.log("REDUCERS .", this.props.reviewReducer.reviews);
    let { reviews } = this.props.reviewReducer;
    console.log("REVIEWS: ", reviews);
    return (
      <div style={{ marginTop: "200px", border: "3px solid red" }}>REVIEWS</div>
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
