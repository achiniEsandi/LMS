import React, { useState } from "react";
import { FaBook, FaClipboardList, FaChartPie, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard({ user }) {
  const navigate = useNavigate();

  const allCourses = [
    { id: 1, title: "Mathematics 101" },
    { id: 2, title: "Physics 201" },
    { id: 3, title: "Chemistry 301" },
    { id: 4, title: "Biology 101" },
    { id: 5, title: "Computer Science 201" },
  ];

  const [enrolledCourses, setEnrolledCourses] = useState([
    { id: 1, title: "Mathematics 101" },
    { id: 2, title: "Physics 201" },
  ]);

  const assignments = [
    { title: "Math Homework 1", due: "Dec 3, 2025" },
    { title: "Physics Lab Report", due: "Dec 5, 2025" },
  ];

  const grades = [
    { course: "Mathematics 101", grade: "A" },
    { course: "Physics 201", grade: "B+" },
  ];

  const events = [
    { title: "Webinar on AI", date: "Dec 7, 2025" },
    { title: "Club Meeting", date: "Dec 10, 2025" },
  ];

  const handleEnroll = (course) => {
    if (!enrolledCourses.some(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
      alert(`You have enrolled in ${course.title}!`);
    } else {
      alert(`You are already enrolled in ${course.title}.`);
    }
  };

  const handleUploadAssignment = () => {
    alert("Assignment uploaded successfully!");
  };

  const navigateToAllCourses = () => {
    alert("Navigate to All Courses page (implement routing here).");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

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
              {enrolledCourses.map((c) => (
                <li key={c.id}>{c.title}</li>
              ))}
            </ul>
            <button 
              onClick={navigateToAllCourses} 
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007acc",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Enroll in Another Course
            </button>
          </div>

          {/* Assignments */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="assignments">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaClipboardList /> Assignments</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {assignments.map((a, idx) => <li key={idx}>{a.title} - Due {a.due}</li>)}
            </ul>
            <button 
              onClick={handleUploadAssignment} 
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007acc",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Upload Assignment
            </button>
          </div>

          {/* Grades */}
          <div style={{ padding: "25px", background: "#ffffff", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" }} id="grades">
            <h2 style={{ color: "#004d99", fontSize: "24px", marginBottom: "20px" }}><FaChartPie /> Grades</h2>
            <ul style={{ fontSize: "18px", lineHeight: "1.8" }}>
              {grades.map((g, idx) => <li key={idx}>{g.course}: {g.grade}</li>)}
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
