const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  AuthenticationError,
} = require("../errors");
const validator = require("email-validator");

const register = async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user)
  res
  .status(StatusCodes.BAD_REQUEST)
  .json("User already exists");;
  if (!validator.validate(req.body.email))
    res.status(StatusCodes.BAD_REQUEST).json("Invalid Email");
  user = await User.create({ ...req.body });
  const { _id: id, name, profileImage } = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    id,
    token,
    name,
    profileImage,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("User doesn't exist");
  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("It's Ezio's password!! Enter yours");

  const { _id: id, name, profileImage } = user;
  const token = await user.createJWT();
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
  };

  try {
    res.cookie("token", token, options).status(StatusCodes.OK).json({
      id,
      token,
      name,
      profileImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login };
