import React from "react";
import { connect } from "react-redux";
import { updatePrizeTimer } from "../actions/actions";

const SECONDS = 1000;
// const MINUTES = SECONDS * 60;
// const HOURS = MINUTES * 60;
// const DAYS = HOURS * 24;

export class Prizes extends React.Component {
  componentDidMount() {
    this.prizeTimer();
  }

  prizeTimer = () => {
    let { prizeTimer } = this.props.prizeTimerReducer;

    let doEachInterval = () => {
      let now = new Date(Date.now()).getTime();
      let distance = prizeTimer - now;
      this.props.updatePrizeTimer(distance);
      if (distance < 0) {
        clearInterval(timer);
      }
    };
    let timer = setInterval(doEachInterval, SECONDS);
  };

  render() {
    let { days, hours, minutes, seconds } = this.props.prizeTimerReducer;

    return (
      <div style={{ marginTop: "200px", border: "3px solid red" }}>
        {days + "d " + hours + "h " + minutes + "m " + seconds + "s "}
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
    updatePrizeTimer: distance => dispatch(updatePrizeTimer(distance))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prizes);
