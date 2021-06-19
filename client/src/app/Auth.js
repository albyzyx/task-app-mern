class AuthClass {
  constructor() {
    console.log();
  }

  signIn({ email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/auth/signin", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.setItem("token", data.token);
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  signUp({ displayName, email, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/auth/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName,
            email,
            password,
          }),
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.setItem("token", data.token);
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  signOut() {
    console.log("in signout in auth");
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("api/auth/signout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        await response.json().then((data) => {
          if (response.status === 200) {
            localStorage.removeItem("token");
            resolve(data);
          } else {
            reject(data);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  isLoggedIn() {
    console.log("in is logged in in auth");
    return new Promise(async (resolve, reject) => {
      if (localStorage.getItem("token"))
        try {
          const response = await fetch("api/user/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          await response.json().then((data) => {
            if (response.status === 200) {
              console.log(data);
              resolve(data);
            } else {
              reject(data);
            }
          });
        } catch (error) {
          reject(error);
        }
    });
  }
}

export default AuthClass;
