import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { AuthProvider } from "@asgardeo/auth-react";
import { config } from "./authConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider config={config}>
        <App />
    </AuthProvider>
);
