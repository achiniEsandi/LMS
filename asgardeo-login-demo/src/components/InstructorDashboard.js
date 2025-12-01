import React from "react";
import { FaBell, FaHome, FaUser, FaBook, FaUpload } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function InstructorDashboard({ user }) {
  const courses = [
    { id: 1, title: "Mathematics 101", students: 30 },
    { id: 2, title: "Physics 201", students: 25 },
    { id: 3, title: "Chemistry 301", students: 28 },
    { id: 4, title: "Biology 101", students: 32 },
    { id: 5, title: "Computer Science 201", students: 22 },
  ];

  const notifications = [
    { message: "New assignment submitted by John Doe.", time: new Date("2025-12-01T10:15:00"), type: "success" },
    { message: "Course evaluation form is due next week.", time: new Date("2025-12-01T09:00:00"), type: "warning" },
    { message: "Staff meeting scheduled on Friday at 10 AM.", time: new Date("2025-11-30T16:30:00"), type: "info" },
    { message: "New student enrolled in Chemistry 301.", time: new Date("2025-12-01T08:45:00"), type: "success" },
    { message: "Grade submissions are due tomorrow.", time: new Date("2025-11-30T14:20:00"), type: "warning" },
  ];

  const badgeColors = {
    success: "#28a745",
    warning: "#ffc107",
    info: "#17a2b8",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#2c3e50",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}>
        {/*<h1 style={{ textAlign: "center", marginBottom: "40px" }}>Instructor Panel</h1>*/}
        <nav style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <a href="/" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaHome /> Home
          </a>
          <a href="#courses" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaBook /> Courses
          </a>
          <a href="#notifications" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaBell /> Notifications
          </a>
          <a href="#progress" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUser /> Student Progress
          </a>
          <a href="#upload" style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUpload /> Upload Materials
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f0f2f5" }}>
        {/* Top Navbar */}
        <div style={{
          height: "60px",
          background: "#1d72b8",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
        }}>
          <h1 style={{ fontSize: "24px" }}>Instructor Dashboard</h1>
          <div>
            Welcome, <strong>{user.username}</strong>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div style={{
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginTop: "20px"
        }}>

          {/* Courses Card */}
          <div id="courses" style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold", color: "#34495e" }}>Courses You Teach</h2>
            <ul style={{ listStyle: "none", padding: 0, maxHeight: "250px", overflowY: "auto" }}>
              {courses.map(course => (
                <li key={course.id} style={{
                  marginBottom: "10px",
                  padding: "10px",
                  background: "#f8f9fa",
                  borderRadius: "5px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <span>{course.title}</span>
                  <span><strong>{course.students} students</strong></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications Card */}
          <div id="notifications" style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h2 style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "28px", fontWeight: "bold", marginBottom: "15px", color: "#34495e" }}>
              <FaBell /> Notifications
            </h2>
            <ul style={{ listStyle: "none", padding: 0, maxHeight: "250px", overflowY: "auto" }}>
              {notifications.map((note, idx) => (
                <li key={idx} style={{
                  marginBottom: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#f9f9f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                  borderLeft: `5px solid ${badgeColors[note.type]}`,
                }}>
                  <span>{note.message}</span>
                  <span style={{ fontSize: "12px", color: "#888", display: "flex", flexDirection: "column", textAlign: "right" }}>
                    <span>{formatDistanceToNow(note.time, { addSuffix: true })}</span>
                    <span>{note.time.toLocaleString()}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Student Progress Card */}
          <div id="progress" style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold", color: "#34495e" }}>Student Progress</h2>
            <p>Track grades, attendance, and progress of students in your courses.</p>
            <br />
            <button style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              background: "linear-gradient(90deg, #1d72b8, #33c3f0)",
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, #33c3f0, #1d72b8)"}
              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(90deg, #1d72b8, #33c3f0)"}
            >
              View Progress
            </button>
          </div>

          {/* Upload Materials Card */}
          <div id="upload" style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold", color: "#34495e" }}>Upload Materials / Assignments</h2>
            <input type="file" style={{ marginBottom: "10px" }} />
            <br /><br />
            <button style={{
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              background: "linear-gradient(90deg, #28a745, #58d68d)",
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(90deg, #58d68d, #28a745)"}
              onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(90deg, #28a745, #58d68d)"}
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
