const { User, Address } = require("../models");

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
exports.createUserAddress = (userId, userAddress) =>
  Address.create({
    province: userAddress.province,
    city: userAddress.city,
    district: userAddress.district,
    zipCode: userAddress.zipCode,
    addressLine: userAddress.addressLine,
    userId,
  });

exports.getAddress = (userId) => Address.findOne({ where: { userId } });
