import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRoute from "./routes/users.js";
import coursesRoute from "./routes/courses.js";
import assignmentsRoute from "./routes/assignments.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/assignments", assignmentsRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
