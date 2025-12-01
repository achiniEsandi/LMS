import express from "express";
import multer from "multer";
import Assignment from "../models/Assignment.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload assignment (instructor)
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const { title, courseId, uploadedBy } = req.body;
        const fileUrl = req.file.path;

        const assignment = new Assignment({ title, courseId, uploadedBy, fileUrl });
        await assignment.save();

        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Student submits assignment
router.post("/submit/:assignmentId", upload.single("file"), async (req, res) => {
    try {
        const { studentId } = req.body;
        const assignment = await Assignment.findById(req.params.assignmentId);
        if (!assignment) return res.status(404).json({ error: "Assignment not found" });

        assignment.submissions.push({
            studentId,
            fileUrl: req.file.path
        });

        await assignment.save();
        res.json({ message: "Assignment submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all assignments for a course
router.get("/course/:courseId", async (req, res) => {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
});

export default router;
