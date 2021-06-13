const express = require("express");
const router = new express.Router();
const authenticateRequest = require("../Auth/middleware/authenticateRequest");
const Auth = require("../Auth/Auth");

router.post("/api/auth/signup", async (req, res) => {
  const body = req.body;
  Auth.createUserWithEmailAndPassword(
    body.displayName,
    body.email,
    body.password
  )
    .then((payload) => {
      res.send(payload);
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.get("/api/auth/signin", async (req, res) => {
  Auth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((payload) => {
      res.send(payload);
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.post("/api/auth/signout", authenticateRequest, async (req, res) => {
  Auth.signOutFromOneDevice(req.user, req.token)
    .then(() => {
      res.send({ message: "USER_LOGGED_OUT" });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

router.delete("/api/auth/delete", async (req, res) => {
  Auth.deleteUserAccount(req.body.email, req.body.password)
    .then(() => {
      res.send({ message: "USER_ACCOUNT_OUT" });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
});

module.exports = router;
