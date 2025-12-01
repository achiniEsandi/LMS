// App.js
import React, { useEffect, useState, useRef } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import AdminDashboard from "./components/AdminDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ProfilePage from "./components/ProfilePage"; // Profile page
import ProtectedRoute from "./components/ProtectedRoute";

import slide1 from "./assets/images/slide1.jpg";
import slide2 from "./assets/images/slide2.jpg";
import slide3 from "./assets/images/slide3.jpg";

import { FaBookOpen, FaUsers, FaChartLine } from "react-icons/fa";

// --- Slideshow Component ---
const slides = [slide1, slide2, slide3];

const Slideshow = ({ onGetStarted }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-96 w-full relative">
            <img
                src={slides[index]}
                alt={`slide-${index}`}
                className="w-full h-full object-cover transition duration-700"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
                <h1 className="text-5xl font-extrabold mb-4">Welcome to LMS Portal</h1>
                <p className="text-lg mb-6 text-center max-w-xl">
                    Manage courses, students, and reports easily.
                </p>
                <button
                    onClick={onGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

// --- Welcome Page Component ---
const WelcomePage = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        onLogin({ useRedirect: true });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-600 to-blue-400">
            {/* Navbar */}
            <nav className="bg-blue-700 bg-opacity-80 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="text-3xl font-extrabold">LMS Portal</div>
                <div className="space-x-4 flex items-center">
                    <a href="#features" className="hover:underline text-lg">Features</a>
                    <a href="#about" className="hover:underline text-lg">About</a>
                    <button
                        onClick={() => onLogin({ useRedirect: true })}
                        className="bg-white text-blue-700 px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Hero / Slideshow */}
            <Slideshow onGetStarted={handleGetStarted} />

            {/* Features Section */}
            <section id="features" className="bg-white py-16 px-8 text-center">
                <h2 className="text-4xl font-bold mb-12 text-blue-700">Our Features</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="bg-blue-50 hover:shadow-lg transition p-8 rounded-xl w-64 flex flex-col items-center gap-4">
                        <FaBookOpen size={40} className="text-blue-600" />
                        <h3 className="font-bold text-xl text-blue-800">Course Management</h3>
                        <p className="text-gray-700">Organize and track courses easily.</p>
                    </div>
                    <div className="bg-blue-50 hover:shadow-lg transition p-8 rounded-xl w-64 flex flex-col items-center gap-4">
                        <FaUsers size={40} className="text-blue-600" />
                        <h3 className="font-bold text-xl text-blue-800">Student Management</h3>
                        <p className="text-gray-700">Monitor student progress efficiently.</p>
                    </div>
                    <div className="bg-blue-50 hover:shadow-lg transition p-8 rounded-xl w-64 flex flex-col items-center gap-4">
                        <FaChartLine size={40} className="text-blue-600" />
                        <h3 className="font-bold text-xl text-blue-800">Reports & Analytics</h3>
                        <p className="text-gray-700">Generate insightful reports instantly.</p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-blue-100 py-16 px-8 text-center">
                <h2 className="text-4xl font-bold mb-6 text-blue-800">About LMS Portal</h2>
                <p className="text-lg max-w-2xl mx-auto text-blue-900">
                    Our LMS Portal provides a seamless experience for managing courses, tracking student performance, and generating reports. Designed for administrators, instructors, and students, it helps you stay organized and connected.
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-blue-700 text-white text-center p-6 mt-auto">
                &copy; 2025 LMS Portal. All rights reserved.
            </footer>
        </div>
    );
};

// --- Main App ---
function App() {
    const { state, signIn, signOut, getBasicUserInfo } = useAuthContext();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (state.isAuthenticated) {
            getBasicUserInfo()
                .then((user) => {
                    if (!user) return;

                    const extracted =
                        user.groups ||
                        user["urn:ietf:params:scim:schemas:core:2.0:User"]?.groups ||
                        [];

                    const normalized = (extracted || [])
                        .map((g) => {
                            if (!g) return null;
                            if (typeof g === "string") return g.toLowerCase();
                            if (g.value) return g.value.toLowerCase();
                            return null;
                        })
                        .filter(Boolean);

                    setRoles(normalized);
                })
                .catch((err) => console.error("Error fetching user info:", err));
        }
    }, [state.isAuthenticated, getBasicUserInfo]);

    const user = {
        username: state?.username,
        email: state?.email,
        roles
    };

    return (
        <Router>
            {!state?.isAuthenticated ? (
                <WelcomePage onLogin={signIn} />
            ) : (
                <div>
                    <div className="flex justify-end m-4">
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>

                    <Routes>
                        {/* Dashboard Routes */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/instructor"
                            element={
                                <ProtectedRoute allowedRoles={['instructor']}>
                                    <InstructorDashboard user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student"
                            element={
                                <ProtectedRoute allowedRoles={['student']}>
                                    <StudentDashboard user={user} />
                                </ProtectedRoute>
                            }
                        />

                        {/* Profile Route */}
                        <Route
                            path="/profile"
                            element={<ProfilePage user={user} />}
                        />

                        {/* Default Route */}
                        <Route
                            path="*"
                            element={
                                roles.includes('admin') ? (
                                    <AdminDashboard user={user} />
                                ) : roles.includes('instructor') ? (
                                    <InstructorDashboard user={user} />
                                ) : (
                                    <StudentDashboard user={user} />
                                )
                            }
                        />
                    </Routes>
                </div>
            )}
        </Router>
    );
}

export default App;
