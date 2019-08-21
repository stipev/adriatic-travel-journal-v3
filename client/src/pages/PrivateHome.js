import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import greenMarker from "../assets/greenMarker.png";
import blueMarker from "../assets/blueMarker.png";
import * as places from "../data/adriaticCoast.json";
import { getUsername, getToken, getId } from "../components/AuthService";
import { connect } from "react-redux";
import axios from "axios";
import { setAllCodes, setAllLocations } from "../actions/actions";

const USER_CODES_URL = "http://localhost:8000/code/all";
const LOCATIONS_URL = "http://localhost:8000/location/all";

class Home extends Component {
  state = {
    viewport: {
      width: 600,
      height: 600,
      latitude: 43.7416835,
      longitude: 15.8174061,
      zoom: 7,
      selectedPlace: " "
    }
  };

  setSelectedPlace(place) {
    this.setState({ selectedPlace: place });
  }

  componentDidMount() {
    axios({
      method: "get",
      url: LOCATIONS_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },

      //
      credentials: "same-origin"
    })
      .then(res => {
        //console.log("LOCATIONS:", res.data.locations);
        this.props.setAllLocations(res.data.locations);

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
          //
          credentials: "same-origin"
        }).then(res => {
          //console.log("resss axios", res.data.codes);
          //this.setState({ userCodes: res.data.codes });
          this.props.setAllCodes(res.data.codes);
        });
      })
      .catch(err => console.log("error", err));
  }

  render() {
    //console.log("places: ", places.places[0]);
    let { locations } = this.props.state.locationReducer;
    console.log("LOCATION", locations);
    return (
      <div style={{ marginTop: "100px" }}>
        Hello {getUsername()}
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
                //            className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  if (e.key === "Escape") {
                    this.setSelectedPlace(null);
                  }
                  this.setSelectedPlace(location);
                }}
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={blueMarker}
                  alt="Location icon"
                />
              </button>
            </Marker>
          ))}

          {this.state.selectedPlace ? (
            <Popup
              latitude={this.state.selectedPlace.latitude}
              longitude={this.state.selectedPlace.longitude}
              onClick={() => {
                console.log("POPUP");
              }}
              closeOnClick={false}
              closeButton={true}
              onClose={() => {
                this.setSelectedPlace(null);
              }}
            >
              <div>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src="./greenMarker.png"
                  alt="Location Icon"
                />
                <h2
                  style={{
                    textDecoration: "underline"
                  }}
                  onClick={() => {
                    console.log("ACTION WILL HAPPEN");
                  }}
                >
                  KLIKNI TU ZA AKCIJU
                </h2>
                <h2>{this.state.selectedPlace.Name}</h2>
                <p>{this.state.selectedPlace.Description}</p>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
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
    setAllLocations: locations => dispatch(setAllLocations(locations))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
