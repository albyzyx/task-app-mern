const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authError = require("../../Auth/authErrors");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("model/invalid-email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length <= 6) {
        throw new Error("model/password-too-short");
      }
    },
  },
  tokens: [
    {
      token: {
        type: Array,
        require: true,
      },
    },
  ],
});

userSchema.statics.findByCredentials = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          reject(authError.emailDoesNotExist);
        }
        bcrypt
          .compare(password, user.password)
          .then((isPasswordMatch) => {
            if (!isPasswordMatch) {
              reject(authError.invalidCredentials);
            }
            return resolve(user);
          })
          .catch(() => {
            reject(authError.internalServerError);
          });
      })
      .catch(() => {
        reject(authError.internalServerError);
      });
  });
};

userSchema.methods.updateUser = function (updates) {
  return new Promise((resolve, reject) => {
    const allowedUpdates = ["displayName"];
    const updateKeys = Object.keys(updates);
    const isValidRequest = updateKeys.every((update) =>
      allowedUpdates.includes(update)
    );
    if (isValidRequest) {
      const user = this;
      updateKeys.forEach((key) => (user[key] = updates[key]));
      user
        .save()
        .then(() => resolve(user))
        .catch((error) => reject(error));
    } else if (updateKeys.length !== 0) {
      reject({ error: "request/invalid-field" });
    }
  });
};

userSchema.methods.generateJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "abc123");
  user.tokens.push({ token });
  await user.save();
  return token;
};

userSchema.methods.verifyCredentials = function (password) {
  return new Promise((resolve, reject) => {
    const user = this;
    bcrypt.compare(password, user.password).then((isPasswordMatch) => {
      if (!isPasswordMatch) {
        reject(authError.invalidCredentials);
      } else {
        resolve();
      }
    });
  });
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.UID = user._id;
  delete user.__v;
  delete user._id;
  delete user.password;
  delete user.tokens;
  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
