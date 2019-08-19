import decode from "jwt-decode";
import axios from "axios";
const SIGN_IN_URL = "http://localhost:8000/signin";

//import { LOGIN_URL, getLogInOptions } from "../components/Helper";
//import { REGISTER_URL, getRegisterOptions } from "../components/Helper";

// export const register = (username, email, password) => {
//   return new Promise((resolve, reject) => {
//     fetch(REGISTER_URL, getRegisterOptions(username, email, password))
//       .then(res => res.json())
//       .then(res => {
//         if (!res.success) {
//           resolve(res.success);
//           console.log("Username or email already exist!");
//           //this.setState({ message: "Username or email already exist!" });
//         } else {
//           resolve(res.success);

//           //this.setState({ message: "Account created successfully!" });
//           console.log("Account created successfully!");
//         }
//       })
//       .catch(error => reject(error));
//   });
// };

export const signIn = (username, password, history) => {
  return new Promise((resolve, reject) => {
    //fetch(LOGIN_URL, getLogInOptions(username, password))
    axios({
      method: "post",
      url: SIGN_IN_URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        username,
        password
      },
      //
      credentials: "same-origin"
    })
      .then(res => {
        if (res.data.success) {
          let { token } = res.data;
          logInWithToken(token, history);
        } else if (!res.data.success) {
          resolve(res.data.message);
        }
      })
      .catch(error => reject(error));
  });
};

const logInWithToken = (token, history) => {
  //let username = getUsernameFromToken(token);
  //console.log("username::", username);
  //let id = getIdFromToken(token);
  //console.log("id::", id);
  setDataToLocalStorage(token);
  //if (isUserAuthenticated()) {
  history.push(`/home/${getUsername()}`);
  //}
};

const setDataToLocalStorage = token => {
  const decodedToken = decode(token);
  const { username, firstName, lastName, email, id } = decodedToken;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("email", email);
  localStorage.setItem("id", id);
};

// export const setExpirationDateToLocalStorage = date => {
//   localStorage.setItem("date", date);
// };

// export const setTokenToLocalStorage = (
//   token
//   //, username, id
// ) => {
//   localStorage.setItem("token", token);
//   let decodedToken = decode(token);
//   localStorage.setItem("username", decodedToken.username);

//   //localStorage.setItem("decodedToken", decode(token));
//   //  localStorage.setItem("username", username);
//   //localStorage.setItem("id", id);
// };

// export const getIdFromLocalStorage = () => {
//   return localStorage.getItem("id");
// };

export const logOut = history => {
  localStorage.clear();
  history.push("/signin");
};

export const getUsername = () => {
  let username;
  username = localStorage.getItem("username", username);
  return username;
};

// export const getUsernameFromToken = token => {
//   let decodedToken = decode(token);
//   console.log("decoded token", decodedToken);
//   let { username } = decodedToken;
//   return username;
// };
// export const getIdFromToken = token => {
//   let decodedToken = decode(token);
//   console.log("id", id);
//   let { id } = decodedToken;
//   return id;
// };

// export const setIdToLocalStorage = () => {
//   let id = getIdFromToken(token);
// };

// export const isUserAuthenticated = () => {
//   let token = localStorage.getItem("token", token);
//   let username = localStorage.getItem("username", username);
//   let _username = getUsernameFromToken(token);
//   if (username === _username) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const isLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

// export const redirectToError = history => {
//   history.push("/404");
// };

export const pathLog = path => {
  console.log("path: ", path);
};
