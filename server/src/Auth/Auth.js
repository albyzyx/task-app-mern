const User = require("../models/User");
const authError = require("./authErrors");
class Auth {
  static createUserWithEmailAndPassword(displayName, email, password) {
    return new Promise((resolve, reject) => {
      const user = new User({ displayName, email, password });
      user
        .save()
        .then((user) => {
          user
            .generateJWT()
            .then((token) => {
              resolve({ user, token });
            })
            .catch(() => {});
        })
        .catch((error) => {
          if (error.keyValue && error.keyValue.email !== undefined) {
            reject(authError.emailAlreadyExist);
          } else if (error.errors && error.errors.password !== undefined) {
            reject(authError.passwordTooShort);
          } else if (error.errors && error.errors.email !== undefined) {
            reject(authError.invalidEmail);
          } else {
            //TODO: Internal server error
            reject(error);
          }
        });
    });
  }

  static signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      User.findByCredentials(email, password)
        .then((user) => {
          user
            .generateJWT()
            .then((token) => {
              resolve({ user, token });
            })
            .catch(() => {
              //TODO: Internal server error
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static signOutFromOneDevice(user, currentToken) {
    return new Promise((resolve, reject) => {
      user.tokens = user.tokens.filter((token) => {
        return token.token != currentToken;
      });
      user
        .save()
        .then(() => resolve())
        .catch(() => {
          reject();
        });
    });
  }

  static deleteUserAccount(email, password) {
    return new Promise((resolve, reject) => {
      User.findByCredentials(email, password)
        .then((user) => {
          User.deleteOne({ _id: user._id })
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Auth;
