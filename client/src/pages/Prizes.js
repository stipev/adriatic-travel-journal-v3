import React from "react";
import { connect } from "react-redux";
import { updatePrizeTimer, timerIsDone, setWinners } from "../actions/actions";
import axios from "axios";
import { getToken, getId } from "../components/AuthService";
import uuidv4 from "uuid/v4";
import { Prize1, Prize2, Prize3 } from "../assets/prizes/index";
import { prizes } from "../components/Helper";
import "../css/Prizes.css";

const PRIZE_CODES_URL = "http://localhost:8000/codes/active";
const USERS_URL = "http://localhost:8000/users/";
const WINNER_CODES_URL = "http://localhost:8000/codes/winner";

const SECONDS = 1000;
const prizeImages = [Prize1, Prize2, Prize3];

export class Prizes extends React.Component {
  state = {
    winners: []
  };

  componentDidMount() {
    const { timerIsOn } = this.props.prizeTimerReducer;
    if (timerIsOn) {
      this.prizeTimer();
    } else {
      this.findWinnersInDatabase();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer;

  findWinnersInDatabase = () => {
    axios({
      method: "get",
      url: WINNER_CODES_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },

      credentials: "same-origin"
    })
      .then(res => {
        this.props.setWinners(res.data.winners);
      })
      .catch(error => console.log("error: ", error));
  };

  getPrizeCodes = () => {
    axios({
      method: "patch",
      url: PRIZE_CODES_URL,
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
        const { codes } = res.data;
        this.getPrizeWinners(codes);
      })
      .catch();
  };

  getPrizeWinners = codes => {
    let winners = [];
    Promise.all([
      this.getWinner(codes[0].userId),
      this.getWinner(codes[1].userId),
      this.getWinner(codes[2].userId)
    ]).then(res => {
      for (let i = 0; i < res.length; i++) {
        winners.push(res[i].data.winner);
        winners[i].code = codes[i].code;
      }
      this.setState({ winners });
      this.props.timerIsDone(winners);
    });
  };

  getWinner = userId => {
    return axios({
      method: "get",
      url: USERS_URL + userId,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken()
      },

      credentials: "same-origin"
    });
  };

  prizeTimer = () => {
    let { prizeTimer } = this.props.prizeTimerReducer;

    let doEachInterval = () => {
      let now = new Date(Date.now()).getTime();
      let distance = prizeTimer - now;
      this.props.updatePrizeTimer(distance);
      if (distance < 0) {
        clearInterval(this.timer);
        this.getPrizeCodes();
      }
    };
    this.timer = setInterval(doEachInterval, SECONDS);
  };

  render() {
    let {
      days,
      hours,
      minutes,
      seconds,
      timerIsOn,
      winners
    } = this.props.prizeTimerReducer;

    return (
      <div className="PrizePageContainer">
        <div>
          <div className="TimerContainer">
            <div className="Timer">
              {timerIsOn ? (
                <div className="notification is-danger">
                  <strong>TIME LEFT: </strong>
                  <strong>
                    {days +
                      "d " +
                      hours +
                      "h " +
                      minutes +
                      "m " +
                      seconds +
                      "s "}
                  </strong>
                </div>
              ) : (
                <div className="notification is-danger">
                  <strong> LUCKY WINNERS </strong>
                  ARE...
                </div>
              )}
            </div>
          </div>
          {timerIsOn ? (
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
          ) : (
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
                        <p>username: {winners[prize.imageIndex].username}</p>
                        <p>first name: {winners[prize.imageIndex].firstName}</p>
                        <p>last name: {winners[prize.imageIndex].lastName}</p>
                        <p>code: {winners[prize.imageIndex].code}</p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  let { prizeTimerReducer } = state;
  return {
    prizeTimerReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updatePrizeTimer: distance => dispatch(updatePrizeTimer(distance)),
    timerIsDone: winners => dispatch(timerIsDone(winners)),
    setWinners: winners => dispatch(setWinners(winners))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prizes);
