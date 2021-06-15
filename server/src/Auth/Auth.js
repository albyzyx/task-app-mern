const User = require("../db/models/User");
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
            reject({ errors: [authError.emailAlreadyExist] });
          } else {
            console.log(authError.internalServerError, ": ", error);
            reject(authError.internalServerError);
          }
        });
    });
  }

  static changePassword(user, currentPassword, newPassword) {
    return new Promise((resolve, reject) => {
      user
        .verifyCredentials(currentPassword)
        .then(() => {
          user.password = newPassword;
          user.save().then(() => resolve());
        })
        .catch((error) => reject(error));
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
