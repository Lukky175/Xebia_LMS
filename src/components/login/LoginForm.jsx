/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/login/LoginForm.jsx
 *
 * Purpose:
 * Renders the user authentication interface for
 * accessing the Xebia Learning Platform.
 *
 * Responsibilities:
 * - Display the login form UI.
 * - Collect user credentials.
 * - Provide secondary authentication actions.
 * - Redirect users to support channels when needed.
 * - Maintain responsive behaviour across devices.
 *
 * Dependencies:
 * - Next.js Image component for optimized assets.
 * - Next.js Link component for internal navigation.
 * - React Icons for form field indicators.
 * - CSS Modules for component-scoped styling.
 *
 * Notes:
 * - This component currently focuses on presentation.
 * - Authentication logic, validation, and API
 *   integration will be implemented in future phases.
 * ==========================================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";

import { useAuth } from "@/context/AuthContext.jsx";
import styles from "./LoginForm.module.css";

/**
 * LoginForm Component
 *
 * @returns {JSX.Element}
 * A login interface containing:
 * - Company branding
 * - Email and password inputs
 * - Remember Me functionality
 * - Password recovery placeholder
 * - Administrator contact support
 */
export default function LoginForm() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const EyeIcon = showPassword ? LuEye : LuEyeOff;

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const res = login(email, password);
        if (res.success) {
            navigate("/dashboard");
        } else {
            setError(res.error);
        }
    };

    return (
        <section className={styles.loginSection}>

            {/* Authentication card */}
            <div className={styles.loginFormBox}>

                <div className={styles.loginFormValue}>

                {/* Floating labels depend on an empty
                    placeholder value (" ") so CSS can
                    determine whether an input contains text. */}
                    <form onSubmit={handleSubmit}>

                        <img
                             src="/logo-light.png"
                             alt="Xebia Logo"
                             width={200}
                             height={70}
                             className={styles.Xebialogo}
                        />

                        <h2 className={styles.loginHeading}>
                            Welcome Back!
                        </h2>

                        <p className={styles.loginSubHeading}>
                            Sign in to your account
                        </p>

                        {error && (
                            <div style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", marginBottom: "15px", fontWeight: "600" }}>
                                {error}
                            </div>
                        )}

                        {/* Email field */}
                        <div className={styles.inputBox}>

                            <MdAlternateEmail
                                className={styles.icon}
                            />

                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                            />

                            <label htmlFor="email">
                                Email
                            </label>

                        </div>


                        {/* Password field */}
                        <div className={styles.inputBox}>

                            <EyeIcon
                                className={styles.icon}
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                            />

                            <label htmlFor="password">
                                Password
                            </label>

                        </div>


                        {/* Secondary authentication actions */}
                        <div className={styles.forget}>

                            <label>
                                <input type="checkbox" />
                                {" "}Remember Me
                            </label>

                            {/* Placeholder link.
                                Replace with the password recovery page
                                once the authentication workflow exists. */}
                            <a href="#">
                                Forgot Password?
                            </a>

                        </div>


                        <button
                            type="submit"
                            className={styles.loginButton}
                        >
                            Login
                        </button>


                        {/* Support contact for authentication issues */}
                        <div className={styles.signup}>

                            <p style={{ marginTop: '8px' }}>
                                Trouble Signing In?{" "}
                                <Link to="/contact">
                                    Contact Administrator
                                </Link>
                            </p>

                        </div>

                        <div className={styles.loginFooter}>
                            © 2026 Xebia Learning Platform.
                            All rights reserved.
                        </div>

                    </form>

                </div>

            </div>

        </section>
    );
}