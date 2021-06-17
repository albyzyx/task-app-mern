import axios from "axios";

class AuthClass {
  constructor() {
    console.log();
  }

  async signIn({ email, password }) {
    const response = await axios.post("http://localhost:8080/api/auth/signin", {
      email,
      password,
    });
    return response.data;
  }

  async SignUp({ displayname, email, password }) {
    const response = await axios.post("http://localhost:8080/api/auth/signup", {
      displayname,
      email,
      password,
    });
    return response.data;
  }

  async SignOut() {
    await axios
      .post("http://localhost:8080/api/auth/signout")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default AuthClass;
