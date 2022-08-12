const { AuthenticationError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authorize = async (req, res, next) => {
  //   console.log("Headers");
  //   console.log(req.headers);
  const authHeader = req.headers.authorization;
  const token2 = req.cookies.token;
  let token = token2;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    if (!token2) {
      throw new AuthenticationError("Authentication Invalid");
    }
    token = token2;
  }

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const curdata = await User.findById(payload.id);
    req.user = {
      id: payload.id,
      name: curdata.name,
      profileImage: curdata.profileImage,
    };
    // console.log(req.user);
    next();
  } catch (error) {
    throw new AuthenticationError("Authentication Invalid");
  }
};
// const authorize = async (req, res, next) => {
//   try {
//     const { token } = req.cookies; //needd to use cookie-parser
//     if (!token) {
//       return res.status(401).json({
//         message: "User must be logged in",
//       });
//     }
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);

//     //saves the user data in req.user so can be acessed by the other controller functions
//     payload = await User.findById(decoded.id);
//     req.user = {
//       id: payload._id,
//       name: payload.name,
//       profileImage: payload.profileImage,
//     };
//     next();
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

module.exports = authorize;
