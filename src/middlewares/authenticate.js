const createError = require("../utils/createError");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log("auth");
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("Unauthorized", 401);
    }
    const token = authorization.split(" ")[1];
    if (!token) createError("Unauthorized", 401);
    console.log("token", token);
    const payload = tokenService.verify(token);
    console.log("payload", payload);
    const user = await userService.getUserById(payload.id);
    if (!user) createError("Unauthorized", 401);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

