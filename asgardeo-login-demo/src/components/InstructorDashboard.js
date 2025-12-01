import React from "react";

export default function InstructorDashboard({ user }) {
    const courses = [
        { id: 1, title: "Mathematics 101", students: 30 },
        { id: 2, title: "Physics 201", students: 25 },
        { id: 3, title: "Chemistry 301", students: 28 },
    ];

    const notifications = [
        "New assignment submitted by John Doe.",
        "Course evaluation form is due next week.",
        "Staff meeting scheduled on Friday at 10 AM.",
    ];

    return (
        <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "40px", fontWeight: "bold"}}>Instructor Dashboard</h1>
            <p style={{ textAlign: "center", color: "#555" }}>
                Welcome, <strong>{user.username}</strong> ({user.email})
            </p>

            {/* Dashboard Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
                
                {/* Courses Card */}
                <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold" }}>Courses You Teach</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {courses.map(course => (
                            <li key={course.id} style={{ marginBottom: "10px", padding: "10px", background: "#ffffff", borderRadius: "5px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                                {course.title} - <strong>{course.students} students</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notifications Card */}
                <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold" }}>Notifications</h2>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {notifications.map((note, index) => (
                            <li key={index} style={{ marginBottom: "10px", padding: "10px", background: "#ffffff", borderRadius: "5px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                                {note}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Student Progress Card */}
                <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold" }}>Student Progress</h2>
                    <p>Track grades, attendance, and progress of students in your courses.</p><br></br>
                    <button style={{ padding: "10px 20px", borderRadius: "5px", border: "none", background: "#007bff", color: "#fff", cursor: "pointer" }}>View Progress</button>
                </div>

                {/* Upload Materials Card */}
                <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h2 style={{ marginBottom: "15px", fontSize: "28px", fontWeight: "bold" }}>Upload Materials / Assignments</h2>
                    <input type="file" style={{ marginBottom: "10px" }} />
                    <br /><br></br>
                    <button style={{ padding: "10px 20px", borderRadius: "5px", border: "none", background: "#28a745", color: "#fff", cursor: "pointer" }}>Upload</button>
                </div>
            </div>
        </div>
    );
}
