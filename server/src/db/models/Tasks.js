const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  tasks: [
    {
      _id: {
        type: ObjectId,
        required: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      deadline: {
        type: String,
        required: true,
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      important: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

tasksSchema.statics.addNewTask = function (uID, task) {
  return new Promise((resolve, reject) => {
    const id = mongoose.Types.ObjectId();

    task._id = id;
    // console.log(task);
    this.findById(uID)
      .then((tasksObject) => {
        if (tasksObject) {
          tasksObject.tasks.push(task);
          tasksObject
            .save()
            .then((tasks) => {
              resolve(tasks.tasks.find((element) => element._id === id));
            })
            .catch(() => {
              reject();
            });
        } else {
          task = new this({
            _id: uID,
            tasks: [task],
          });
          task
            .save()
            .then((tasks) => {
              resolve(tasks.tasks.find((element) => element._id === id));
            })
            .catch(() => {
              reject();
            });
        }
      })
      .catch(() => {
        //Internal Server Error- Database Error
        reject();
      });
  });
};

tasksSchema.methods.updateTask = function (index, updates) {
  return new Promise((resolve, reject) => {
    const task = this;
    const allowedUpdates = [
      "description",
      "completed",
      "important",
      "deadline",
    ];
    const updateKeys = Object.keys(updates);
    const isValidUpdate = updateKeys.every((updateKey) =>
      allowedUpdates.includes(updateKey)
    );
    if (isValidUpdate) {
      updateKeys.forEach((updateKey) => {
        task.tasks[index][updateKey] = updates[updateKey];
      });
      task.save().then((tasks) => {
        resolve(tasks.tasks[index]);
      });
    } else {
      //bad request
      reject();
    }
  });
};

tasksSchema.methods.removeTask = function (index) {
  return new Promise((resolve, reject) => {
    const task = this;
  });
};

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
