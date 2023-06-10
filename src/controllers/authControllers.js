const { User, Address } = require("../models");
const { Op } = require("sequelize");
const bcryptService = require("../services/bcryptService");
const tokenService = require("../services/tokenService");
const {
  generalRegisterValidate,
  loginValidate,
} = require("../validators/authValidator");
const userService = require("../services/userService");
const createError = require("../utils/createError");
const { token } = require("morgan");
// CREATE
exports.register = async (req, res, next) => {
  try {
    // validate request from front end
    const value = generalRegisterValidate(req.body);

    // if the request's format is valid, then check if the account already exist in db
    const isUserExist = await userService.checkEmailExist(value.email);
    if (isUserExist) createErorr("Email address already in use"); // throw err

    value.password = await bcryptService.hash(value.password);
    const user = await userService.createUser(value);
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createUserAddress = (userAddress) => Address.create(userAddress);

exports.login = async (req, res, next) => {
  try {
    const value = loginValidate(req.body);
    console.log("value", value);
    const user = await userService.getUserByEmail(value.email);
    console.log("user", user);
    console.log("password", user.password);
    if (!user) createError("Invalid Credential");
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) createError("Invalid Credential");
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
// READ
