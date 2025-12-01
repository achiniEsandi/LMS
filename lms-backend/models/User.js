const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    asgardeoId: { type: String, unique: true, sparse: true },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    
});

module.exports = mongoose.model("User", userSchema);
