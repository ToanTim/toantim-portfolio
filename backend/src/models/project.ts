// src/models/Project.ts
import mongoose from "mongoose";

const StepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String },
  content: {
    engineering: { type: String, required: true }, // HTML string
  },
  images: { type: [String], default: [] },
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  active_status: { type: Boolean, default: false },
  description: { type: String, required: true },
  tech: { type: [String], default: [] },
  image: { type: String },
  category: { type: String },
  tags: { type: [String], default: [] },
  gradient: { type: String },
  steps: [StepSchema],
}, {
  timestamps: true, // adds createdAt & updatedAt
});

export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
