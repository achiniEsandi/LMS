import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Sync Asgardeo user with backend DB
router.post("/asgardeo-login", async (req, res) => {
    try {
        const { sub, email, username } = req.body;

        // Check if already exists
        let user = await User.findOne({ asgardeoId: sub });

        if (!user) {
            user = new User({
                username,
                email,
                asgardeoId: sub,
                role: "student",
            });
            await user.save();
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
