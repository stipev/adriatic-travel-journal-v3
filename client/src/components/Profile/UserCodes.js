import React, { Component } from "react";
import { getId } from "../AuthService";
import uuidv4 from "uuid/v4";

import axios from "axios";

const USER_CODES_URL = "http://localhost:8000/code/all";

class UserCodes extends Component {
  state = {
    userCodes: []
  };

  componentDidMount() {
    axios({
      method: "post",
      url: USER_CODES_URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        userId: getId()
      },
      //
      credentials: "same-origin"
    })
      .then(res => {
        //console.log("resss axios", res.data.codes);
        this.setState({ userCodes: res.data.codes });
      })
      .catch(err => console.log("error", err));
  }

  render() {
    let { userCodes } = this.state;
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

export default UserCodes;
