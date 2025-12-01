// App.js
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import InstructorDashboard from "./components/InstructorDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import slide1 from "./assets/images/slide1.jpg";
import slide2 from "./assets/images/slide2.jpg";
import slide3 from "./assets/images/slide3.jpg";

// --- Slideshow Component ---

const slides = [slide1, slide2, slide3];

const Slideshow = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
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
                <h1 className="text-4xl font-bold mb-4">Welcome to LMS Portal</h1>
                <p className="text-lg mb-6 text-center">Manage courses, students, and reports easily.</p>
            </div>
        </div>
    );
};

// --- Welcome Page Component ---
const WelcomePage = ({ onLogin }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">LMS Portal</div>
                <div className="space-x-4">
                    <a href="#features" className="hover:underline">Features</a>
                    <a href="#about" className="hover:underline">About</a>
                    <button
                        onClick={() => onLogin({ useRedirect: true })}
                        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Login
                    </button>
                </div>
            </nav>

            {/* Slideshow / Hero */}
            <Slideshow />

            {/* Features Section */}
            <div id="features" className="bg-gray-100 p-12 text-center">
                <h2 className="text-3xl font-bold mb-8">Our Features</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="bg-white p-6 rounded shadow w-64">
                        <h3 className="font-bold mb-2">Course Management</h3>
                        <p>Organize and track courses easily.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow w-64">
                        <h3 className="font-bold mb-2">Student Management</h3>
                        <p>Monitor student progress efficiently.</p>
                    </div>
                    <div className="bg-white p-6 rounded shadow w-64">
                        <h3 className="font-bold mb-2">Reports & Analytics</h3>
                        <p>Generate insightful reports instantly.</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center p-4">
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

                    console.log("FULL USER INFO:", user);

                    const extracted =
                        user.groups ||
                        user["urn:ietf:params:scim:schemas:core:2.0:User"]?.groups ||
                        [];

                    // Safe normalization to avoid null errors
                    const normalized = (extracted || [])
                        .map((g) => {
                            if (!g) return null;
                            if (typeof g === "string") return g.toLowerCase();
                            if (g.value) return g.value.toLowerCase();
                            return null;
                        })
                        .filter(Boolean);

                    console.log("Normalized roles:", normalized);
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
                    {/* Logout button */}
                    <div className="flex justify-end m-4">
                        <button
                            onClick={() => signOut()}
                            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Dashboard Routes */}
                    <Routes>
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard user={user} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/customer"
                            element={
                                <ProtectedRoute allowedRoles={['customer']}>
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
                        <Route
                            path="*"
                            element={
                                roles.includes('admin') ? (
                                    <AdminDashboard user={user} />
                                ) : (
                                    <InstructorDashboard user={user} />
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
