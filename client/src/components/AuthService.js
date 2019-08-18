import decode from "jwt-decode";
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

// export const logIn = (usernameMail, password, history) => {
//   return new Promise((resolve, reject) => {
//     fetch(LOGIN_URL, getLogInOptions(usernameMail, password))
//       .then(res => res.json())
//       .then(res => {
//         resolve(res.success);
//         let { token } = res;
//         logInWithToken(token, history);
//       })
//       .catch(error => reject(error));
//   });
// };

// export const logInWithToken = (token, history) => {
//   let username = getUsernameFromToken(token);
//   //console.log("username::", username);
//   let id = getIdFromToken(token);
//   //console.log("id::", id);
//   setTokenToLocalStorage(token, username, id);
//   if (isUserAuthenticated()) {
//     history.push(`/home/${username}`);
//   }
// };

// export const setExpirationDateToLocalStorage = date => {
//   localStorage.setItem("date", date);
// };

export const setTokenToLocalStorage = (
  token
  //, username, id
) => {
  localStorage.setItem("token", token);
  let decodedToken = decode(token);
  localStorage.setItem("username", decodedToken.username);

  //localStorage.setItem("decodedToken", decode(token));
  //  localStorage.setItem("username", username);
  //localStorage.setItem("id", id);
};

export const getIdFromLocalStorage = () => {
  return localStorage.getItem("id");
};

export const logOut = history => {
  localStorage.clear();
  history.push("/signin");
};

export const getUsername = () => {
  let username = localStorage.getItem("username", username);
  return username;
};

export const getUsernameFromToken = token => {
  let decodedToken = decode(token);
  console.log("decoded token", decodedToken);
  let { username } = decodedToken;
  return username;
};
export const getIdFromToken = token => {
  let decodedToken = decode(token);
  console.log("id", id);
  let { id } = decodedToken;
  return id;
};

// export const setIdToLocalStorage = () => {
//   let id = getIdFromToken(token);
// };

export const isUserAuthenticated = () => {
  let token = localStorage.getItem("token", token);
  let username = localStorage.getItem("username", username);
  let _username = getUsernameFromToken(token);
  if (username === _username) {
    return true;
  } else {
    return false;
  }
};

export const isLoggedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export const redirectToError = history => {
  history.push("/404");
};

export const pathLog = path => {
  console.log("path: ", path);
};
