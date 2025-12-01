import React, { useState, useEffect } from "react";
import { FaBook, FaClipboardList, FaChartPie, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard({ user }) {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [events] = useState([
    { title: "Webinar on AI", date: "Dec 7, 2025" },
    { title: "Club Meeting", date: "Dec 10, 2025" },
  ]);

  // Fetch user info and enrolled courses
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user._id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        console.log("Fetched user:", data);

        setEnrolledCourses(data.enrolledCourses || []);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch assignments uploaded by this student
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments?uploadedBy=${user._id}`);
        if (!res.ok) throw new Error("Failed to fetch assignments");

        const data = await res.json();
        setAssignments(data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
    fetchAssignments();
  }, [user._id]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file || !title || !courseId) return alert("Fill all fields");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("courseId", courseId);
    formData.append("uploadedBy", user._id);

    try {
      const res = await fetch("http://localhost:5000/api/assignments/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      alert("Assignment uploaded successfully!");
      console.log("Uploaded assignment:", data);

      setAssignments((prev) => [...prev, data]);
      setFile(null);
      setTitle("");
      setCourseId("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const navigateToAllCourses = () => {
    alert("Navigate to All Courses page (implement routing here).");
  };

  const goToProfile = () => navigate("/profile");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#004d99", color: "#fff", padding: "30px", display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "24px", textAlign: "center" }}>Student Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "25px", fontSize: "18px" }}>
          <a href="#enrolled" style={{ color: "#fff", textDecoration: "none", display: "flex", gap: "12px", alignItems: "center" }}><FaBook /> Enrolled Courses</a>
          <a href="#assignments" style={{ color: "#fff", textDecoration: "none", display: "flex", gap: "12px", alignItems: "center" }}><FaClipboardList /> Assignments</a>
          <a href="#grades" style={{ color: "#fff", textDecoration: "none", display: "flex", gap: "12px", alignItems: "center" }}><FaChartPie /> Grades</a>
          <a href="#events" style={{ color: "#fff", textDecoration: "none", display: "flex", gap: "12px", alignItems: "center" }}><FaCalendarAlt /> Events</a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#e6f0ff", padding: "30px" }}>
        {/* Top Navbar */}
        <div style={{ height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "30px" }}>
          <h1 style={{ color: "#004d99", fontSize: "32px" }}>Welcome, {user.username}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", fontWeight: "bold", fontSize: "18px", color: "#004d99" }}>
            <span>{user.email}</span>
            <FaUserCircle size={32} style={{ cursor: "pointer" }} title="Profile" onClick={goToProfile} />
          </div>
        </div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "25px" }}>
          {/* Enrolled Courses */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="enrolled">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaBook /> Enrolled Courses</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {enrolledCourses.length === 0
                ? <li>No courses enrolled yet.</li>
                : enrolledCourses.map(c => <li key={c._id}>{c.title}</li>)}
            </ul>
            <button onClick={navigateToAllCourses} style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#007acc", color: "#fff", cursor: "pointer", fontSize: "16px" }}>
              Enroll in Another Course
            </button>
          </div>

          {/* Assignments */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="assignments">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaClipboardList /> Assignments</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {assignments.length === 0
                ? <li>No assignments uploaded yet.</li>
                : assignments.map((a) => <li key={a._id}>{a.title} - {a.courseTitle || a.courseId}</li>)}
            </ul>

            <input type="text" placeholder="Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 mb-2 w-full" />
            <select value={courseId} onChange={(e) => setCourseId(e.target.value)} className="border p-2 mb-2 w-full">
              <option value="">Select Course</option>
              {enrolledCourses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button onClick={handleUpload} style={{ marginTop: "15px", padding: "10px 20px", borderRadius: "5px", border: "none", backgroundColor: "#007acc", color: "#fff", cursor: "pointer", fontSize: "16px" }}>
              Upload Assignment
            </button>
          </div>

          {/* Grades */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="grades">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaChartPie /> Grades</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {grades.length === 0
                ? <li>No grades yet.</li>
                : grades.map((g, idx) => <li key={idx}>{g.course}: {g.grade}</li>)}
            </ul>
          </div>

          {/* Events */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="events">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaCalendarAlt /> Events</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {events.map((e, idx) => <li key={idx}>{e.title} - {e.date}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
