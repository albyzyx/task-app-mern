require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const app = express();
const port = process.env.PORT || 8080;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, mode"
  );

  //intercepts OPTIONS method
  if ("OPTIONS" === req.method) {
    //respond with 200
    res.sendStatus(200);
  } else {
    //move on
    next();
  }
});

app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);

app.get("/api/ping", (req, res) => {
  res.send(new Date().getTime().toString());
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
