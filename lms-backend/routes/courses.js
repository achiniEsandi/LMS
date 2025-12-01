import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// Create a course
router.post("/", async (req, res) => {
    try {
        const { title, description, instructor } = req.body;
        const course = new Course({ title, description, instructor });
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all courses
router.get("/", async (req, res) => {
    const courses = await Course.find().populate("students").populate("instructor");
    res.json(courses);
});

// Enroll student
router.post("/enroll", async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!user || !course) return res.status(404).json({ error: "User or course not found" });

        if (!user.enrolledCourses.includes(courseId)) user.enrolledCourses.push(courseId);
        if (!course.students.includes(userId)) course.students.push(userId);

        await user.save();
        await course.save();

        res.json({ message: "Enrolled successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
