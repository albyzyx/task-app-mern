const TasksModel = require("../db/models/Tasks");

class Tasks {
  static createNewTask(req) {
    return new Promise((resolve, reject) => {
      TasksModel.addNewTask(req.user._id, req.body)
        .then((task) => {
          resolve(task);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Tasks;
