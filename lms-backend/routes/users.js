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

// Get single user by ID
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id).populate("enrolledCourses");
    res.json(user);
});

export default router;
