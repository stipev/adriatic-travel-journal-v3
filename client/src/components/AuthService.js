import decode from "jwt-decode";
import axios from "axios";
const SIGN_IN_URL = "http://localhost:8000/signin";
const SIGN_UP_URL = "http://localhost:8000/signup";

export const signUp = (
  firstName,
  lastName,
  username,
  email,
  password,
  history
) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: SIGN_UP_URL,
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        firstName,
        lastName,
        username,
        email,
        password
      }
    })
      .then(res => {
        console.log("res:", res.data.success);
        if (res.data.success) {
          signIn(username, password, history);
        } else if (!res.data.success) {
          resolve(res.data.message);
        }
      })
      .catch(err => reject(err));
  });
};

export const signIn = (username, password, history) => {
  return new Promise((resolve, reject) => {
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
          signInWithToken(token, history);
        } else if (!res.data.success) {
          resolve(res.data.message);
        }
      })
      .catch(error => reject(error));
  });
};

const signInWithToken = (token, history) => {
  setDataToLocalStorage(token);
  history.push(`/home/${getUsername()}`);
};

const setDataToLocalStorage = token => {
  const decodedToken = decode(token);
  const { username, firstName, lastName, email, id } = decodedToken;
  try {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};

export const signOut = history => {
  try {
    localStorage.clear();
    history.push("/signin");
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getToken = () => {
  let token;
  try {
    token = localStorage.getItem("token", token);
    return token;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};
export const getUsername = () => {
  try {
    let username;
    username = localStorage.getItem("username", username);
    return username;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};
export const getFirstName = () => {
  try {
    let firstName;
    firstName = localStorage.getItem("firstName", firstName);
    return firstName;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};
export const getLastName = () => {
  try {
    let lastName;
    lastName = localStorage.getItem("lastName", lastName);
    return lastName;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};
export const getEmail = () => {
  try {
    let email;
    email = localStorage.getItem("email", email);
    return email;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};
export const getId = () => {
  try {
    let id;
    id = localStorage.getItem("id", id);
    return id;
  } catch (error) {
    console.log("error: ", error);
    return undefined;
  }
};

export const isSignedIn = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

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

// export const redirectToError = history => {
//   history.push("/404");
// };

// export const pathLog = path => {
//   console.log("path: ", path);
// };
