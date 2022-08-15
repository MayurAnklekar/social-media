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

const followUser = async (req, res) => {
  const userToFollow = await User.findById(req.params.id);
  // console.log("User to follow", userToFollow);
  const user = await User.findById(req.user.id);
  // console.log("User", user);
  if (!userToFollow) {
    return res.status(StatusCodes.UNAUTHORIZED).json("User Not found");
  }
  if (req.params.id.toString() == req.user.id.toString()) {
    return res.status(StatusCodes.BAD_REQUEST).json("Cannot Follow Self");
  }
  if (user.following.includes(req.params.id)) {
    user.following.splice(user.following.indexOf(req.params.id), 1);
    userToFollow.followers.splice(
      userToFollow.followers.indexOf(req.user.id),
      1
    );
    await user.save();
    await userToFollow.save();
    res.status(StatusCodes.OK).json("User Unfollowed");
  } else {
    userToFollow.followers.push(req.user.id);
    user.following.push(req.params.id);
    await user.save();
    await userToFollow.save();

    res.status(StatusCodes.OK).json("User Followed");
  }
};

module.exports = { getUsers, updateDP, updateUser, followUser };
