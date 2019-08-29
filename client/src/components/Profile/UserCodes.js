import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import { connect } from "react-redux";

class UserCodes extends Component {
  render() {
    let { codes } = this.props.state.userCodes;
    let userCodes = codes.codes;
    console.log("codes: ", userCodes);
    console.log("codes length: ", userCodes.length);
    return (
      <div>
        CODE LIST:
        {userCodes.length > 0 ? (
          <div className="box">
            {userCodes.map(code => {
              return <p key={uuidv4()}>{code.code}</p>;
            })}
          </div>
        ) : (
          <div>NO CODES YET</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("AAAAAAAAAA STATE: ", state);
  state = state.codeReducer;
  return {
    state
  };
};

export default connect(mapStateToProps)(UserCodes);
