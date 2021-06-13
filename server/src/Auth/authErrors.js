const authError = {
  emailAlreadyExist: "AUTH/EMAIL_ALREADY_EXIST",
  invalidEmail: "AUTH/INVALID_EMAIL",
  passwordTooShort: "AUTH/PASSWORD_TOO_SHORT",
  emailDoesNotExist: "AUTH/EMAIL_DOES_NOT_EXIST",
  invalidCredentials: "AUTH/INVALID_CREDENTIALS",
  connectionError: "AUTH/CONNECTION_ERROR",
  internalServerError: "AUTH/INTERNAL_SERVER_ERROR",
};
//TODO: Bad request
module.exports = authError;
