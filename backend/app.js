require("dotenv").config();
require("express-async-errors");
const { clientURL } = require("./URI");
const fileUpload = require("express-fileupload");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const helmet = require("helmet");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const xss = require("xss-clean");
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: "*" }));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//routers

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const messageRouter = require("./routes/message");
const chatRouter = require("./routes/chat");

//middleware

const authorizationMiddleware = require("./middleware/authorization");

// Routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", authorizationMiddleware, postRouter);
app.use("/api/v1/users", authorizationMiddleware, userRouter);
app.use("/api/v1/messages", authorizationMiddleware, messageRouter);
app.use("/api/v1/chats", authorizationMiddleware, chatRouter);

//socket io server

const {
  addUser,
  getUserID,
  getSocketID,
  removeUser,
} = require("./socket/users");
const {
  createMessage,
  deleteMessages,
  deleteChat,
} = require("./utils/messageSocketEvents");

io.on("connection", (socket) => {
  io.emit("usersOnline", addUser(socket.handshake.query.id, socket.id));
  socket.on("send message", async (message, to, chatId, id) => {
    socket
      .to(getSocketID(to))
      .emit("receive message", message, getUserID(socket.id));
    await createMessage({ chatId, id, message });
  });
  socket.on("delete chat", async (chatID, to) => {
    socket.to(getSocketID(to)).emit("delete chat", chatID);
    await deleteChat({ chatID });
  });
  socket.on("clear chat", async (chatID, to) => {
    socket.to(getSocketID(to)).emit("clear chat", chatID);
    await deleteMessages({ chatID });
  });
  socket.on("disconnect", () => {
    io.emit("usersOnline", removeUser(socket.id));
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome" });
});

start();
