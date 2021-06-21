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

router.get("/api/tasks", authenticateRequest, (req, res) => {
  Tasks.getAllTasks(req)
    .then((tasks) => {
      tasks._id = undefined;
      tasks.__v = undefined;
      // tempTasks = tasks.tasks;
      // console.log(tasks.tasks[0].deadline);
      // for (let i = 0; i < tasks.tasks.length; i++) {
      //   const date = new Date.parse(tasks.tasks[i].deadline.slice(0, 10));
      //   if (!tempTasks.hasOwnProperty(date)) {
      //     tmpTasks[date] = [tasks.tasks[i]];
      //   } else {
      //     tmpTasks[date].push(tasks.tasks[i]);
      //   }
      // }
      console.log(tasks);
      res.send(tasks);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.patch("/api/tasks", authenticateRequest, (req, res) => {
  Tasks.updateTask(req)
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/api/tasks", authenticateRequest, (req, res) => {
  Tasks.deleteTask(req)
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
