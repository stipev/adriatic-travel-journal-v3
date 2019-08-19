const User = require("../models/User");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;
//const Op = Sequelize.Op;

//bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {

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
        //message = "Server error!";
        //resolve(message);
        reject(error);
      });
  });

  //   res.length === 0
  //     ? usernameExist(username).then(res => {
  //         console.log("res afer emailexist", res.length);
  //       })
  //     : (message = "Username already exist");
  //   console.log("message in emailExist", message);
  // })
  // //.then()
  // .catch(err => console.log("err: ", err));

  //return new

  //=> {
  //  .then(res => console.log(" emailExist res.length: ", res.length))
  //    .catch(err => console.log("err", err));
  //usernameExist(username);
  // User.create({ firstName, lastName, username, email, password })
  //   .then(() =>
  //     resolve({
  //       // message: `User with username: ${username} successfully created`
  //     })
  //   )
  //   .catch(() => {
  //     reject({
  //       // message: "Error while creating user"
  //     });
  //   });
  // });
};

const createUser = (firstName, lastName, username, email, password) => {
  return User.create({ firstName, lastName, username, email, password });
};

const emailExist = email => {
  console.log("email exist called");
  return User.findAll({
    where: {
      email
    }
  });
  //.then(res => {
  // console.log("res.length", res.length);
  // return res.length;
  //})
  //.catch(err => console.log("err", err));
};

const usernameExist = username => {
  console.log("username exist called");
  return User.findAll({
    where: {
      username
    }
  });
  //.then(res => res.length)
  //.catch(err => console.log("err", err));
};

module.exports = { signUp };
