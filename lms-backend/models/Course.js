const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
});

module.exports = mongoose.model("Course", courseSchema);
