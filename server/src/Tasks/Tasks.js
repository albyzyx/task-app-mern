const TasksModel = require("../db/models/Tasks");

class Tasks {
  static createNewTask(req) {
    return new Promise((resolve, reject) => {
      TasksModel.addNewTask(req.user._id, req.body)
        .then((task) => {
          resolve(task);
        })
        .catch(() => {
          // Database Error
          reject();
        });
    });
  }
  static getAllTasks(req) {
    return new Promise((resolve, reject) => {
      TasksModel.findOne({ _id: req.user._id })
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          // Database Error
          reject();
        });
    });
  }
  static updateTask(req) {
    return new Promise((resolve, reject) => {
      TasksModel.findOne({ _id: req.user._id })
        .then((data) => {
          const taskIndex = data.tasks.findIndex(
            (task) => task._id == req.body.id
          );
          if (taskIndex !== -1) {
            delete req.body.id;
            data
              .updateTask(taskIndex, req.body)
              .then((task) => {
                resolve(task);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            //invalid id
            reject();
          }
        })
        .catch(() => {
          reject();
        });
    });
  }
  static deleteTask(req) {
    return new Promise((resolve, reject) => {
      TasksModel.findOne({ _id: req.user._id })
        .then((data) => {
          data.tasks = data.tasks.filter((task) => task._id != req.body.id);
          data.save().then(() => {
            resolve();
          });
        })
        .catch((error) => {
          reject();
        });
    });
  }
}

module.exports = Tasks;
