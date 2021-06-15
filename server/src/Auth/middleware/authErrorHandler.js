const authError = require("../authErrors");
const User = require("../../db/models/User");
const validator = require("validator");

const authErrorHandler = {
  createUser: (req, res, next) => {
    let errors = [];
    const requiredFields = ["displayName", "email", "password"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        errors.push(authError[field + "Missing"]);
      }
    }
    if (req.body.password && req.body.password.length < 7) {
      errors.push(authError.passwordTooShort);
    }
    if (req.body.email && !validator.isEmail(req.body.email)) {
      errors.push(authError.invalidEmail);
    } else if (req.body.email) {
      //TODO: Check for email clash
    }
    if (errors.length !== 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  },
  signIn: (req, res, next) => {
    let errors = [];
    const requiredFields = ["email", "password"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        errors.push(authError[field + "Missing"]);
      }
    }
    if (req.body.password && req.body.password.length < 7) {
      errors.push(authError.passwordTooShort);
    }
    if (req.body.email && !validator.isEmail(req.body.email)) {
      errors.push(authError.invalidEmail);
    }
    if (errors.length !== 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  },
  changePassword: (req, res, next) => {
    let errors = [];
    const requiredFields = ["currentPassword", "newPassword"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        errors.push(authError[field + "Missing"]);
      }
    }
    if (req.body.newPassword && req.body.newPassword.length < 7) {
      errors.push(authError.passwordTooShort);
    }
    if (errors.length !== 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  },
  changeEmail: (req, res, next) => {
    if (req.body.email === undefined) {
      res.status(400).send({ error: authError.passwordMissing });
    }
    next();
  },
  deleteAccount: (req, res, next) => {
    let errors = [];
    const requiredFields = ["email", "password"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        errors.push(authError[field + "Missing"]);
      }
    }
    if (req.body.password && req.body.password.length < 7) {
      errors.push(authError.passwordTooShort);
    }
    if (req.body.email && !validator.isEmail(req.body.email)) {
      errors.push(authError.invalidEmail);
    }
    if (errors.length !== 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  },
};

module.exports = authErrorHandler;
