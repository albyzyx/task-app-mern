const express = require("express");
const router = new express.Router();
const User = require("../db/models/User");
const authenticateRequest = require("../Auth/middleware/authenticateRequest");

router.get("/api/user/me", authenticateRequest, (req, res) => {
  res.send(req.user);
});

router.patch("/api/user/me", authenticateRequest, (req, res) => {
  req.user
    .updateUser(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
});

module.exports = router;
