import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Split1, Zadar1 } from "../assets/locations/index";
import { Prize1, Prize2, Prize3 } from "../assets/prizes/index";
import { prizes } from "../components/Helper";
import uuidv4 from "uuid/v4";
import "../css/PrivateHome.css";
import "../css/Prizes.css";

const prizeImages = [Prize1, Prize2, Prize3];

class PublicHome extends Component {
  setSelectedLocation(location) {
    this.setState({ selectedLocation: location });
  }

  render() {
    return (
      <div className="PrivateHomeContainer">
        <div style={{ marginBottom: "3rem" }} className="HelloMessage">
          <div className="notification is-info">
            <strong> Welcome !!! :) </strong> <br />
            Breathtaking beauty of adriatic coast waiting for
            <strong> you </strong>! <br />
            <strong>
              <Link to="/signup"> SIGN UP </Link>
            </strong>
            and win valuable prizes
          </div>
        </div>

        <div className="PrizesContainer">
          {prizes.map(prize => {
            return (
              <div key={uuidv4()} className="PrizeContainer">
                <article className="message is-link">
                  <div className="message-header">
                    <p>{prize.title}</p>
                  </div>
                  <div className="message-body">
                    <img
                      className="PrizeImage"
                      src={prizeImages[prize.imageIndex]}
                      alt="prize image"
                    />
                    <strong>{prize.prizeName} </strong>
                    {prize.prizeDescription}
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <div className="DescriptionAndImageContainer box">
          <div className="DescriptionContainer">
            <p className="subtitle is-5"> Adriatic coast </p>
            <p className="subtitle is-6">
              Visit breathtaking locations
              <Link to="/signin"> SIGN IN </Link> for more pictures in our
              gallery!
            </p>
          </div>
          <div className="ImageContainer box ">
            <img src={Split1} alt="location image 1" />
            <img className="BottomImage" src={Zadar1} alt="location image 2" />
          </div>
        </div>
      </div>
    );
  }
}

export default PublicHome;
