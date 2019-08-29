import React, { Component } from "react";

class PublicHome extends Component {
  componentDidMount() {
    console.log("HOME CALLED");
  }

  render() {
    //console.log("places: ", places.places[0]);
    return <div style={{ marginTop: "100px" }}>HOME PUBLIC PAGE</div>;
  }
}

export default PublicHome;
