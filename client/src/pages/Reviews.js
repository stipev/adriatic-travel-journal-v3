import React from "react";
import axios from "axios";
import { getToken } from "../components/AuthService";
import { setAllReviews } from "../actions/actions";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";
import "../Reviews.css";

const REVIEWS_URL = "http://localhost:8000/review/all";

class Reviews extends React.Component {
  componentDidMount() {
    this.getLocationsFromReviews();
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
        this.setState({ reviewsToShow: res.data.reviews });
        this.props.setAllReviews(res.data.reviews);
      })
      .catch(err => console.log("error", err));
  }

  state = {
    reviewsToShow: []
  };

  getLocationsFromReviews = () => {
    let { reviews } = this.props.reviewReducer;
    let allReivewsLocations = reviews.map(review => {
      return review.location;
    });
    // console.log("ALLlocations: ", allReivewsLocations);
    let locations = [...new Set(allReivewsLocations)];

    return locations;
  };

  getAverageLocationRate = location => {
    let sumOfRates = 0;
    let { reviews } = this.props.reviewReducer;
    let locations = reviews.filter(review => review.location === location);
    let locationReviewsRate = locations.map(review => review.rate);
    for (let i = 0; i < locationReviewsRate.length; i++) {
      sumOfRates = sumOfRates + parseFloat(locationReviewsRate[i]);
    }
    return parseFloat(
      sumOfRates / parseFloat(locationReviewsRate.length)
    ).toFixed(2);
  };

  orderReviewsByLocation = location => {
    let { reviews } = this.props.reviewReducer;
    let { reviewsToShow } = this.state;
    reviewsToShow = reviews.filter(review => review.location === location);
    this.setState({ reviewsToShow });
  };

  render() {
    let { reviewsToShow } = this.state;
    console.log("ssdasadsfsf", this.props.reviewReducer);
    return (
      <div className="ReviewsPageContainer">
        <div className="Menu">
          <a className="list-item">Oldest to newest</a>
          <a className="list-item">Newest to oldest</a>
          {this.getLocationsFromReviews().map(location => {
            return (
              <a
                onClick={() => {
                  this.orderReviewsByLocation(location);
                }}
                key={uuidv4()}
                className="list-item is-active"
              >
                {location}({this.getAverageLocationRate(location)})
              </a>
            );
          })}
        </div>
        <div className="ReviewsContainer">
          {reviewsToShow.length > 0 ? (
            <div>
              {reviewsToShow.map(review => {
                return (
                  <div key={uuidv4()} className="ReviewCard card">
                    <header className="card-header">
                      <p className="card-header-title">{review.username}</p>
                      <p className="card-header-icon">
                        {review.rate}
                        <i className="fas fa-star icon has-text-info"></i>
                      </p>
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
              })}
            </div>
          ) : (
            <div className="box">No reviews yet!</div>
          )}
        </div>
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
