const express = require("express");
const authenticateRequest = require("../Auth/middleware/authenticateRequest");
const router = new express.Router();
const Tasks = require("../Tasks/Tasks");
const taskErrorHandler = require("../Tasks/middleware/taskErrorHandler");

router.post(
  "/api/tasks",
  authenticateRequest,
  taskErrorHandler.createNewTask,
  (req, res) => {
    Tasks.createNewTask(req)
      .then((tasks) => {
        res.send(tasks);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }
);

module.exports = router;
