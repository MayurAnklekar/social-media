const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Post = require("../models/Post");
const uploadImage = require("../utils/uploadImage");

const options = { new: true, runValidators: true };

const getUsers = async (req, res) => {
  const { query = "", id } = req.query;
  const search = new RegExp(query, "i");
  if (id) {
    const user = await User.findById(id).select({ password: 0 });
    if (!user) throw new Error(`No user exist with id ${id}`);
    res.status(200).json({ user });
  }
  const users = await User.find({ name: search }).select({ password: 0 });
  res.status(200).json({ users });
};

const updateDP = async (req, res) => {
  const image = req.files?.image;
  console.log(req.files);
  console.log(req.files.image);
  if (!image) throw new BadRequestError("Expected an image");
  const { secure_url: profileImage } = await uploadImage(image);
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { profileImage },
    options
  ).select({ password: 0 });
  if (!user) throw new NotFoundError(`No user exist with id ${id}`);
  await Post.updateMany(
    { createdBy: id },
    { userDetails: { name: user.name, image: profileImage } }
  );

  req.user.profileImage = profileImage;
  console.log("Profile pic change in cache");
  console.log(req.user);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  console.log("Update USER");
  console.log(req.body);
  const user = await User.findByIdAndUpdate(id, req.body, options).select({
    password: 0,
  });
  if (!user) throw new NotFoundError(`No user exist with id ${id}`);
  await Post.updateMany(
    { createdBy: id },
    { userDetails: { name: user.name, image: user.profileImage } }
  );

  req.user.name = req.body.name;
  console.log("User name change in cache");
  console.log(req.user);

  res.status(StatusCodes.OK).json({ user });
};

module.exports = { getUsers, updateDP, updateUser };
