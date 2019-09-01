import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import greenMarker from "../assets/greenMarker.png";
import blueMarker from "../assets/blueMarker.png";
import { getUsername, getToken, getId } from "../components/AuthService";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAllCodes, markVisitedLocation } from "../actions/actions";
import "../PrivateHome.css";
import {
  Sibenik1,
  Sibenik2,
  Split1,
  Split2,
  Zadar1,
  Zadar2
} from "../assets/locations/index";

const USER_CODES_URL = "http://localhost:8000/code/user";
const LOCATIONS = {
  Sibenik: [Sibenik1, Sibenik2],
  Split: [Split1, Split2],
  Zadar: [Zadar1, Zadar2]
};

const LOCATIONS_ARRAY = [Sibenik1, Sibenik2, Split1, Split2, Zadar1, Zadar2];

class PrivateHome extends Component {
  state = {
    viewport: {
      width: 500,
      height: 600,
      latitude: 43.7416835,
      longitude: 15.8174061,
      zoom: 6.3,
      selectedLocation: " ",
      helperMessage: true,
      name: "",
      description: "",
      image1: undefined,
      image2: undefined,
      getLocationImage: false
    }
  };

  setSelectedLocation(location) {
    this.setState({ selectedLocation: location });
  }

  setRandomData = () => {
    this.setState({
      name: "Adriatic coast",
      description: "Visit breathtaking locations"
    });

    let image1 = Math.floor(Math.random() * LOCATIONS_ARRAY.length);
    let image2;
    do {
      image2 = Math.floor(Math.random() * LOCATIONS_ARRAY.length);
    } while (image1 === image2);
    image1 = LOCATIONS_ARRAY[image1];
    image2 = LOCATIONS_ARRAY[image2];

    this.setState({ image1, image2 });
  };

  componentDidMount() {
    this.getLastDate("Split");
    this.setRandomData();
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
    })
      .then(res => {
        this.setState({ helperMessage: true });

        this.props.setAllCodes(res.data);
        let { userCodes } = this.props.state.codeReducer;
        if (userCodes.codes.codes.length > 0) {
          this.visitedPlace(userCodes.codes.codes);
        }
      })

      .catch(error => console.log("error: ", error));
  }

  visitedPlace = codes => {
    for (let i = 0; i < codes.length; i++) {
      this.props.markVisitedLocation(codes[i].location);
    }
  };

  getImage = () => {
    const { name } = this.state.selectedLocation;
    const images = LOCATIONS[name];
    const image = images[Math.floor(Math.random() * images.length)];
    return image;
  };

  setLocationDescriptionAndImages = () => {
    const { name } = this.state.selectedLocation;
    const { description } = this.state.selectedLocation;
    const images = LOCATIONS[name];
    const image1 = images[0];
    const image2 = images[1];
    this.setState({ name, description, image1, image2 });
  };

  getDates = location => {
    const locationCodes = this.props.state.codeReducer.userCodes.codes.codes.filter(
      code => code.location === location
    );
    //console.log("locationCodes: ", locationCodes);

    const dates = [];
    for (let i = 0; i < locationCodes.length; i++) {
      dates.push(locationCodes[i].date);
    }
    console.log("dates: ", dates);
    return dates;
  };

  getNumberOfVisits = location => {
    const locationCodes = this.props.state.codeReducer.userCodes.codes.codes.filter(
      code => code.location === location
    );
    return locationCodes.length;
  };

  getLastDate = location => {
    const locationCodes = this.props.state.codeReducer.userCodes.codes.codes.filter(
      code => code.location === location
    );

    const dates = [];
    for (let i = 0; i < locationCodes.length; i++) {
      dates.push(locationCodes[i].date);
    }

    let latestDate = dates[0].split("-");
    let latestYear = parseInt(latestDate[0]);
    let latestMonth = parseInt(latestDate[1]);
    let latestDay = parseInt(latestDate[2]);
    let sortedByYear = [];
    for (let i = 0; i < dates.length; i++) {
      let date = dates[i].split("-");
      let year = parseInt(date[0]);

      if (latestYear <= year) {
        latestYear = year;
      }
    }
    for (let i = 0; i < dates.length; i++) {
      let date = dates[i].split("-");
      let year = parseInt(date[0]);
      if (year === latestYear) {
        sortedByYear.push(dates[i]);
      }
    }
    let sortedByMonth = [];
    for (let i = 0; i < sortedByYear.length; i++) {
      let date = sortedByYear[i].split("-");
      let month = parseInt(date[1]);
      if (latestMonth <= month) {
        latestMonth = month;
      }
    }

    for (let i = 0; i < sortedByYear.length; i++) {
      let date = sortedByYear[i].split("-");
      let month = parseInt(date[1]);
      if (month === latestMonth) {
        sortedByMonth.push(sortedByYear[i]);
      }
    }

    for (let i = 0; i < sortedByMonth.length; i++) {
      let date = sortedByMonth[i].split("-");
      let day = parseInt(date[2]);
      if (latestDay <= day) {
        latestDay = day;
        latestDate = sortedByMonth[i];
      }
    }
    return latestDate;
  };

  render() {
    let { locations } = this.props.state.locationReducer;
    // console.log(
    //   "this.props.state",
    //   this.props.state.codeReducer.userCodes.codes.codes
    // );
    return (
      <div className="PrivateHomeContainer">
        {/* <img src={Zadar1} alt="" /> */}
        <div className="HelloMessage">
          <div className="notification is-info">
            <strong> Welcome {getUsername()} !!! :) </strong> <br />
            Breathtaking beauty of adriatic coast waiting for{" "}
            <strong>you</strong>!
          </div>
        </div>

        <div className="MapAndHelperMessageContainer">
          <div className="MapContainer box">
            <ReactMapGL
              {...this.state.viewport}
              mapboxApiAccessToken="pk.eyJ1Ijoic3RpcGUyMTEyIiwiYSI6ImNqejRpMjk4djBkOXAzbnBhYmhqNncxaWUifQ.Dt6V1FJWMsuz80YEx0ghdg"
              onViewportChange={viewport => this.setState({ viewport })}
              mapStyle="mapbox://styles/stipe2112/cjz4im98v00zq1cn20gbvl8qp"
            >
              {locations.map(location => (
                <Marker
                  key={location.id}
                  latitude={location.latitude}
                  longitude={location.longitude}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={e => {
                      e.preventDefault();
                      if (e.key === "Escape") {
                        this.setSelectedLocation(null);
                      }
                      this.setSelectedLocation(location);
                    }}
                  >
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={location.visited ? greenMarker : blueMarker}
                      alt="Location icon"
                    />
                  </button>
                </Marker>
              ))}

              {this.state.selectedLocation ? (
                <Popup
                  latitude={this.state.selectedLocation.latitude}
                  longitude={this.state.selectedLocation.longitude}
                  closeOnClick={false}
                  closeButton={true}
                  onClose={() => {
                    this.setSelectedLocation(null);
                  }}
                >
                  <div className="box">
                    <img
                      className="PopUpImage"
                      //style={{ width: "200px", height: "200px" }}
                      src={this.getImage()}
                      alt="Location Icon"
                    />

                    <h2
                      onClick={() => {
                        this.setLocationDescriptionAndImages();
                      }}
                    >
                      {this.state.selectedLocation.name}
                    </h2>
                    <p>{this.state.selectedLocation.description}</p>
                    <div>
                      LAST VISIT:{" "}
                      {this.state.selectedLocation.visited ? (
                        <p>
                          {" "}
                          {this.getLastDate(
                            this.state.selectedLocation.name
                          )}{" "}
                        </p>
                      ) : (
                        <p>Location not visited yet</p>
                      )}
                    </div>
                    <div>
                      NUMBER OF VISITS:
                      {this.state.selectedLocation.visited ? (
                        <p>
                          {" "}
                          {this.getNumberOfVisits(
                            this.state.selectedLocation.name
                          )}{" "}
                        </p>
                      ) : (
                        <p>0</p>
                      )}
                    </div>
                  </div>
                </Popup>
              ) : null}
            </ReactMapGL>
          </div>
          {this.state.helperMessage === true ? (
            <div className="HelperMessage">
              <article className="message is-link">
                <div className="message-header">
                  <p>HOW TO USE THIS APP?</p>
                  <button
                    onClick={() => {
                      this.setState({ helperMessage: false });
                    }}
                    className="delete"
                    aria-label="delete"
                  ></button>
                </div>
                <div className="message-body">
                  <strong>1. </strong>
                  Collect
                  <strong> codes </strong>
                  by visiting
                  <strong> adriatic coast locations </strong>
                  <br />
                  <strong>2. </strong>
                  Submit
                  <strong> codes </strong>
                  on your
                  <Link to="/profile">
                    <strong> PROFILE </strong>
                  </Link>
                  <br />
                  <strong>3. </strong>
                  Enjoy your journey and win valuable
                  <Link to="/prizes">
                    <strong> PRIZES </strong>
                  </Link>
                  <br />
                  <br /> LOCATIONS MARKS: <br /> <br />{" "}
                  <strong>visited:</strong>
                  <br />
                  <img
                    className="HelperMessageMark"
                    src={greenMarker}
                    alt="greenMarker"
                  />
                  <br />
                  <strong>unvisited:</strong>
                  <br />
                  <img
                    className="HelperMessageMark"
                    src={blueMarker}
                    alt="blueMarker"
                  />
                  <br />
                  <i>Click on X above to never show this message again!</i>
                </div>
              </article>
            </div>
          ) : null}
        </div>
        <div className="DescriptionAndImageContainer box">
          <div className="DescriptionContainer">
            <p className="subtitle is-5"> {this.state.name} </p>
            <p className="subtitle is-6">{this.state.description}</p>
          </div>
          <div className="ImageContainer box ">
            <img src={this.state.image1} alt="location image 1" />
            <img
              className="BottomImage"
              src={this.state.image2}
              alt="location image 2"
            />
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
    setAllCodes: codes => dispatch(setAllCodes(codes)),
    markVisitedLocation: location => dispatch(markVisitedLocation(location))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateHome);
