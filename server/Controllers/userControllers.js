const User = require("../Models/User");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

const signUp = (firstName, lastName, username, email, password) => {
  let message = "";
  let success;
  return new Promise((resolve, reject) => {
    emailExist(email)
      .then(res => {
        if (res.length === 0) {
          usernameExist(username)
            .then(res => {
              if (res.length === 0) {
                bcrypt
                  .hash(password, BCRYPT_SALT_ROUNDS)
                  .then(hashedPassword => {
                    createUser(
                      firstName,
                      lastName,
                      username,
                      email,
                      hashedPassword
                    ).then(() => {
                      message = "User created successfully!";
                      success = true;
                      resolve({ message, success });
                    });
                  });
              } else {
                message = "Username already exist!";
                success = false;
                resolve({ message, success });
              }
            })
            .catch();
        } else {
          message = "Email already exist!";
          success = false;
          resolve({ message, success });
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const createUser = (firstName, lastName, username, email, password) => {
  return User.create({ firstName, lastName, username, email, password });
};

const emailExist = email => {
  return User.findAll({
    where: {
      email
    }
  });
};

const usernameExist = username => {
  return User.findAll({
    where: {
      username
    }
  });
};

const getWinner = id => {
  return User.findOne({
    attributes: ["username", "firstName", "lastName"],
    where: { id }
  });
};

module.exports = { signUp, getWinner };
