import React from "react";

export default function CustomerDashboard({ user }) {
    return (
        <div>
            <h1>Customer Dashboard</h1>
            <p>Welcome, {user.username} ({user.email})</p>
            <p>Here you can see your profile, orders, or dashboard data.</p>
        </div>
    );
}
