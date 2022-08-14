const { StatusCodes } = require("http-status-codes");
const Message = require("../models/Message");
const Chat = require("../models/Chat");

const getMessages = async (req, res) => {
  const { chatId } = req.query;
  console.log(req.query);
  const userId = req.user.id;
  //   console.log(userId);
  const chat = await Chat.findById(chatId);
  //   console.log(chat);
  //   console.log(chat.members[0] != userId);
  if (chat.members[0] != userId && chat.members[1] != userId)
    res.status(401).json("You are not authorized");
  const messages = await Message.find({ chatID: chatId });
  res.status(StatusCodes.OK).json({ messages });
};

const deleteM = async (req, res) => {
  if (req.user.id === "62f4e9696618ef0af823fc7a") {
    const messages = await Chat.deleteMany({ lastMessage: { $exists: false } });
    res.status(StatusCodes.OK).json({ messages });
  } else {
    res.status(401).json("Sorry Not Autorized");
  }
  res.json({ msg: "admin delete" });
};

module.exports = { getMessages, deleteM };
