const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title: String,
    fileUrl: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submissions: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        fileUrl: String,
        submittedAt: { type: Date, default: Date.now }
    }],
    dueDate: Date
});

module.exports = mongoose.model("Assignment", assignmentSchema);
