import axios from "axios";

class AuthClass {
  constructor() {
    console.log("this is a thing");
  }

  async signIn({ email, password }) {
    await axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async SignUp({ displayname, email, password }) {
    await axios
      .post("./register", {
        displayname,
        email,
        password,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async SignOut() {
    await axios
      .post("/logout")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default AuthClass;
