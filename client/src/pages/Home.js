import React, { Component } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import greenMarker from "../assets/greenMarker.png";
import blueMarker from "../assets/blueMarker.png";
import * as places from "../data/adriaticCoast.json";

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

  render() {
    console.log("places: ", places.places[0]);
    return (
      <div style={{ marginTop: "100px" }}>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken="pk.eyJ1Ijoic3RpcGUyMTEyIiwiYSI6ImNqejRpMjk4djBkOXAzbnBhYmhqNncxaWUifQ.Dt6V1FJWMsuz80YEx0ghdg"
          onViewportChange={viewport => this.setState({ viewport })}
          mapStyle="mapbox://styles/stipe2112/cjz4im98v00zq1cn20gbvl8qp"
        >
          {places.places.map(place => (
            <Marker
              key={place.id}
              latitude={place.latitude}
              longitude={place.longitude}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer"
                }}
                className="marker-btn"
                onClick={e => {
                  e.preventDefault();
                  if (e.key === "Escape") {
                    this.setSelectedPlace(null);
                  }
                  this.setSelectedPlace(place);
                }}
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={place.visited ? blueMarker : greenMarker}
                  alt="Skate Park Icon"
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
                  alt="Skate Park Icon"
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

export default Home;
