import React from "react";

export default function AdminDashboard({ user }) {
  const stats = {
    totalStudents: 120,
    totalCourses: 8,
    totalInstructors: 5,
    pendingApprovals: 3,
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          LMS Admin
        </div>

        <nav className="flex-1 mt-4">
          <ul>
            <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
              Dashboard
            </li>
            <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
              Manage Users
            </li>
            <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
              Manage Courses
            </li>
            <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
              Reports
            </li>
            <li className="px-6 py-3 hover:bg-gray-700 cursor-pointer">
              Pending Approvals
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-gray-700">
          <p className="text-sm">Logged in as:</p>
          <p className="font-semibold break-all">{user.username}</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome, {user.username} ({user.email})
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Total Students</h2>
            <p className="text-3xl font-bold text-blue-500">
              {stats.totalStudents}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Total Courses</h2>
            <p className="text-3xl font-bold text-green-500">
              {stats.totalCourses}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Total Instructors</h2>
            <p className="text-3xl font-bold text-purple-500">
              {stats.totalInstructors}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
            <p className="text-3xl font-bold text-red-500">
              {stats.pendingApprovals}
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p>View, edit, or remove students and instructors.</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go to Users
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
            <p>Create new courses or update existing courses.</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Go to Courses
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">View Reports</h2>
            <p>Track student progress and course analytics.</p>
            <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
              View Reports
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Pending Approvals</h2>
            <p>Approve enrollments and instructor requests.</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Check Approvals
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
