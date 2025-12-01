import express from "express";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

// 1️⃣ Create a course
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

// 2️⃣ Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find()
    .populate("students", "username email")
    .populate("instructor", "username email");
  res.json(courses);
});

// 3️⃣ Manual enrollment by admin/instructor
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

// 4️⃣ Student requests enrollment
router.post("/request", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ error: "Course not found" });

    if (!course.enrollmentRequests.includes(userId)) {
      course.enrollmentRequests.push(userId);
      await course.save();
      res.json({ message: "Enrollment request sent" });
    } else {
      res.status(400).json({ error: "Request already sent" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ Approve enrollment request (admin/instructor)
router.post("/approve", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) return res.status(404).json({ error: "User or course not found" });

    // Remove from requests
    course.enrollmentRequests = course.enrollmentRequests.filter(id => id.toString() !== userId);

    // Add to enrolled
    if (!user.enrolledCourses.includes(courseId)) user.enrolledCourses.push(courseId);
    if (!course.students.includes(userId)) course.students.push(userId);

    await user.save();
    await course.save();

    res.json({ message: "Enrollment approved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
