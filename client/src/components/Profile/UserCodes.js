import React, { Component } from "react";
//import { getId, getToken } from "../AuthService";
import uuidv4 from "uuid/v4";

//import axios from "axios";
import { connect } from "react-redux";
//import { setAllCodes } from "../../actions/actions";

//const USER_CODES_URL = "http://localhost:8000/code/all";

class UserCodes extends Component {
  componentDidMount() {
    //console.log("USER CODES COMPONENT MOUNTED");
  }

  render() {
    let { userCodes } = this.props.state;
    return (
      <div>
        CODE LIST:
        {userCodes.length > 0 ? (
          <div className="box">
            {userCodes.map(userCode => {
              return <p key={uuidv4()}>{userCode}</p>;
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
  state = state.codeReducer;
  return {
    state
  };
};

export default connect(mapStateToProps)(UserCodes);
