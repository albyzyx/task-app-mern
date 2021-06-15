const authError = {
  emailAlreadyExist: "auth/email-already-exist",
  invalidEmail: "auth/invalid-email",
  passwordTooShort: "auth/password-too-short",
  emailDoesNotExist: "auth/invalid-credentials",
  invalidCredentials: "auth/invalid-credentials",
  notAuthenticated: "auth/request-not-authenticated",
  connectionError: "AUTH/CONNECTION_ERROR",
  internalServerError: "server/internal-server-error",
  displayNameMissing: "request/display-name-required",
  passwordMissing: "request/password-required",
  emailMissing: "request/email-required",
  newPasswordMissing: "request/new-password-required",
  currentPasswordMissing: "request/current-password-required",
};
//TODO: Bad request
module.exports = authError;
