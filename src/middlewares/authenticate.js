const createError = require("../utils/createError");
const userService = require("../services/userService");
const tokenService = require("../services/tokenService");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startWith("Bearer ")) {
      createError("Unauthorized", 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) createError("Unauthorized", 401);
    const payload = tokenService.verify(token);
    const user = await userService.getUserById(payload.id);
    if (!user) createError("Unauthorized", 401);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
