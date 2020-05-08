require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = require("socket.io")(server);

const Message = require("./models/message-schema");

// DB Setup
mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
// DB Setup

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

//Route
const projectRoutes = require("./routes/project-routes");
app.use("/project", projectRoutes);
const messageRoutes = require("./routes/message-routes");
app.use("/message", messageRoutes);
//Route

let users = [];
let messages = [];

// SOcket Config
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("add user", (username) => {
    users.push(username);
    socket.broadcast.emit("user joined", {
      username: username,
      numUsers: users.length,
      allUsers: users,
    });
  });

  socket.on("add message", ({ username, message }) => {
    messages.push({ username, message, _id: messages.length });
    socket.broadcast.emit("new message", {
      messages,
    });
  });

  socket.on("delete user", (username) => {
    let indexOfUser = users.indexOf(username);
    users.splice(indexOfUser, 1);
    socket.broadcast.emit("user left", {
      usernameOfPersonLeaving: username,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    if (users.length == 0) {
      messages = [];
    }
  });
});
// Socket Config

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

module.exports = app;
