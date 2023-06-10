const bcrypt = require("bcryptjs");

exports.hash = (password) => {
  return bcrypt.hash(password, +process.env.HASH_SALT);
};

exports.compare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
