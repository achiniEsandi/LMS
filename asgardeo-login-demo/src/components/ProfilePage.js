import React from "react";

export default function ProfilePage({ user }) {
  return (
    <div style={{ padding: "50px", fontFamily: "'Segoe UI', sans-serif", background: "#e6f0ff", minHeight: "100vh" }}>
      <h1 style={{ color: "#004d99", fontSize: "32px", marginBottom: "20px" }}>Profile</h1>
      <div style={{ background: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)", maxWidth: "500px" }}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> Student</p>
        <button style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007acc",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px"
        }}>Edit Profile</button>
      </div>
    </div>
  );
}
