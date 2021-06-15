const express = require("express");
require("./db/mongoose");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const app = express();
const port = 8080;

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
