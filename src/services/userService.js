const { User } = require("../models");

exports.checkEmailExist = async (email) => {
  const existUser = await User.findOne({ where: { email: email } });
  return !!existUser;
};

exports.createUser = (user) => User.create(user);

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};
