const jwt = require("jsonwebtoken");

exports.sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

// (payload) => console.log("jwt sign");
// jwt.sign(payload, process.env.JWT_SECRETKEY, {
//   expiresIn: process.env.JWT_EXPIRE_IN,
// })}

exports.verify = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
  return payload;
};
