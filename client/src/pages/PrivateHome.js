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
      descriptionName: "",
      description: ""
    }
  };

  setSelectedLocation(location) {
    this.setState({ selectedLocation: location });
  }

  componentDidMount() {
    this.setState({ descriptionName: "Visit breathtaking locations" });
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

      .catch(err => console.log("error", err));
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

  render() {
    let { locations } = this.props.state.locationReducer;
    console.log("this.state.description", this.state.descriptionName);
    // console.log(
    //   "this.state.selectedLocation.location",
    //   this.state.selectedLocation
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
                  <div>
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={this.getImage()}
                      alt="Location Icon"
                    />
                    {/* <h2
                      style={{
                        textDecoration: "underline"
                      }}
                      onClick={() => {
                        console.log("ACTION WILL HAPPEN");
                      }}
                    >
                      KLIKNI TU ZA AKCIJU
                    </h2> */}
                    <h2
                      onClick={() => {
                        console.log("LOCA", this.state.selectedLocation.name);
                      }}
                    >
                      {this.state.selectedLocation.name}
                    </h2>
                    <p>{this.state.selectedLocation.description}</p>
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
        <div className="DescriptionAndImageContainer">
          <div className="DescriptionContainer">
            <p className="subtitle is-5"> {this.state.descriptionName} </p>
            <p className="subtitle is-6">{this.state.description}</p>
          </div>
          <div className="ImageContainer box">
            <img src={Split2} alt="" />
            <img className="BottomImage" src={Split1} alt="" />
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
