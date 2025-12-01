import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  enrollmentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // for pending requests
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
