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

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  console.log("get user by id");
  return user;
};
