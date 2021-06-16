import axios from "axios";

class AuthClass {
  constructor() {
    console.log("this is a thing");
  }

  async signIn(req) {
    // axios
    //   .post("http://localhost:8080/auth/signin", {
    //     email,
    //     password,
    //   })
    //   .then((response) => {
    //     return response;
    //   })
    //   .catch((error) => {
    //     return new Error(error);
    //   });
    try {
      let res = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
        body: JSON.stringify(req),
      });
      let currentUser = await res.json();

      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  }

  SignUp({ displayname, email, password }) {
    axios
      .post("/auth/signup", {
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

  SignOut() {
    axios
      .post("/auth/signout")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default AuthClass;
