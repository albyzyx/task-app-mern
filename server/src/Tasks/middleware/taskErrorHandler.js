const taskError = require("../taskError");

const taskErrorHandler = {
  createNewTask: (req, res, next) => {
    let errors = [];
    const requiredFields = ["description", "deadline"];
    for (const field of requiredFields) {
      if (req.body[field] === undefined) {
        errors.push(taskError[field + "Missing"]);
      }
    }
    if (req.body.description && req.body.description.length === 0) {
      errors.push(taskError.invalidDescription);
    }
    if (req.body.deadline && req.body.deadline.length === 0) {
      errors.push(taskError.invalidDeadline);
    }
    if (errors.length !== 0) {
      res.status(400).send({ errors });
    } else {
      next();
    }
  },
};

module.exports = taskErrorHandler;
