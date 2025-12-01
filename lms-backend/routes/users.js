import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Create user
router.post("/", async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const user = new User({ username, email, role });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// Get user by ID with populated enrolledCourses
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("enrolledCourses"); // <-- important
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
