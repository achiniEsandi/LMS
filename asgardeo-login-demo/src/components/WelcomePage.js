import React from "react";

export default function WelcomePage({ onLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to LMS Portal</h1>
      <p className="mb-6 text-gray-700 text-lg">
        Manage courses, students, and reports easily.
      </p>
      <button
        onClick={onLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
      >
        Login with Asgardeo
      </button>
    </div>
  );
}
