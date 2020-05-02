const express = require("express");
const router = express.Router();

const Message = require("../models/message-schema");

router.post("/create", (req, res, next) => {
  new Message({
    user: req.body.user,
    body: req.body.body,
  }).save((err, doc) => {
    if (!err) {
      res.json(doc);
    } else {
      res.json(err);
    }
  });
});

router.get("/messages", (req, res, next) => {
  Message.find()
    .then((allMessages) => {
      res.json({ allMessages });
    })
    .catch((err) => {
      res.json({ err });
    });
});

module.exports = router;
