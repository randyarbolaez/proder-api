require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
// const socketIo = require("socket.io"); WEBSOCKET

const server = http.createServer(app);

// const Message = require("./models/message-schema"); WEBSOCKET

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

// const io = socketIo(server); WEBSOCKET

// let interval;WEBSOCKET

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });  WEBSOCKET

// let getApiAndEmit = (socket) => {
//   console.log("SOCKET", socket);
//   // Emitting a new message. Will be consumed by the client
//   Message.find()
//     .then((messages) => {
//       socket.emit("FromAPI", messages);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }; WEBSOCKET

server.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

module.exports = app;
