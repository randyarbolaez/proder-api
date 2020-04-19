const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    totalDifference: { type: Number },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
