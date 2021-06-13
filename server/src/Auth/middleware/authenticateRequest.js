const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const authenticateRequest = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.decode(token, "abc123");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "auth/not-authenticated" });
  }
};

module.exports = authenticateRequest;
