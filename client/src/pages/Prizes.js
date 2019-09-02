import React from "react";
import { connect } from "react-redux";
import { updatePrizeTimer, timerIsDone } from "../actions/actions";
import axios from "axios";
import { getToken, getId } from "../components/AuthService";
import uuidv4 from "uuid/v4";
import { Prize1, Prize2, Prize3 } from "../assets/prizes/index";
import "../Prizes.css";

const PRIZE_CODES_URL = "http://localhost:8000/codes/active";
const USERS_URL = "http://localhost:8000/users/";

const SECONDS = 1000;
// const MINUTES = SECONDS * 60;
// const HOURS = MINUTES * 60;
// const DAYS = HOURS * 24;

export class Prizes extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.getPrizeCodes();
    }, 10 * SECONDS);

    this.prizeTimer();
  }

  state = {
    winners: [],
    codes: []
  };

  getPrizeCodes = () => {
    axios({
      method: "get",
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
  //dodati u redux
  getPrizeWinners = codes => {
    // console.log("codes: ", codes);
    // console.log("userIDDDD: ", codes[0].userId);

    let winners = [];
    Promise.all([
      this.getWinner(codes[0].userId),
      this.getWinner(codes[1].userId),
      this.getWinner(codes[2].userId)
    ]).then(res => {
      for (let i = 0; i < res.length; i++) {
        res[i].data.winner.place = i + 1;
        winners.push(res[i].data.winner);
      }
      this.setState({ winners, codes });
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
        clearInterval(timer);
        this.props.timerIsDone();
      }
    };
    let timer = setInterval(doEachInterval, SECONDS);
  };

  render() {
    //console.log("this.props.", this.props.prizeTimerReducer.timerIsOn);
    let {
      days,
      hours,
      minutes,
      seconds,
      timerIsOn
    } = this.props.prizeTimerReducer;

    return (
      <div className="PrizePageContainer">
        <div className="PrizesContainer">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <div className="TimerContainer">
              {timerIsOn ? (
                <div class="notification is-danger">
                  <strong>REMAINING TIME: </strong>
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
                <div class="notification is-danger">AND THE WINNER IS...</div>
              )}
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <div className="PrizeContainer">
                <article class="message is-link">
                  <div class="message-header">
                    <p>First prize</p>
                  </div>
                  <div class="message-body">
                    <img
                      className="PrizeImage"
                      src={Prize1}
                      alt="prize1 image"
                    />
                    <strong>Million dollars </strong>
                    cool thing to win!! ;)
                  </div>
                </article>
              </div>
            </div>
            <div className="column">
              <div className="PrizeContainer">
                <article class="message is-link">
                  <div class="message-header">
                    <p>Second prize</p>
                  </div>
                  <div class="message-body">
                    <img
                      className="PrizeImage"
                      src={Prize2}
                      alt="prize2 image"
                    />
                    <strong>Lamborghini </strong>
                    cool thing to drive!! :)
                  </div>
                </article>
              </div>
            </div>
            <div className="column">
              <div className="PrizeContainer">
                <article class="message is-link">
                  <div class="message-header">
                    <p>Third prize</p>
                  </div>
                  <div class="message-body">
                    <img
                      className="PrizeImage"
                      src={Prize3}
                      alt="prize3 image"
                    />
                    <strong> MacBook Pro </strong>
                    cool thing to code on!! =)
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div>
          {this.state.winners.length === 3 ? (
            <div>
              {this.state.winners.map(winner => {
                return (
                  <div key={uuidv4()}>
                    <p>place : {winner.place}</p>
                    <p>username: {winner.username}</p>
                    <p>first name: {winner.firstName}</p>
                    <p>last name: {winner.lastName}</p>
                    <p>code: {this.state.codes[winner.place - 1].code}</p>
                    <br />
                    <br />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>NO winners yet</div>
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
    timerIsDone: () => dispatch(timerIsDone())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prizes);
