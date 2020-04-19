const express = require("express");
const router = express.Router();

const Project = require("../models/project-schema");

router.post("/create", (req, res, next) => {
  let { likes, dislikes } = req.body;
  new Project({
    title: req.body.title,
    description: req.body.description,
    likes: 0,
    dislikes: 0,
    totalDifference: likes - dislikes,
  }).save((err, doc) => {
    if (!err) {
      res.json(doc);
    } else {
      res.json(err);
    }
  });
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .then((allProjects) => {
      res.json({ allProjects });
    })
    .catch((err) => {
      res.json({ err });
    });
});

router.put("/update/:id", (req, res, next) => {
  let body = req.body;
  Project.findByIdAndUpdate(req.params.id, body)
    .then((updatedProject) => {
      res.json({ updatedProject, body });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
