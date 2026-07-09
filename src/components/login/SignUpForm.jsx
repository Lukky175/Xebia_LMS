import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLock, MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
import { useAuth } from "@/context/AuthContext.jsx";
import styles from "./SignUpForm.module.css";

export default function SignUpForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [organisation, setOrganisation] = useState("Xebia");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Simulating Registration success and saving user details
        const savedUsers = JSON.parse(localStorage.getItem("lms_registered_users") || "[]");
        
        // Check if user already exists in mock data or local registrations
        const preExistingEmails = [
            "superadmin@xebia.com",
            "admin@xebia.com",
            "trainer@xebia.com",
            "student@xebia.com"
        ];
        
        if (preExistingEmails.includes(email.toLowerCase()) || savedUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            setError("User with this email already exists!");
            return;
        }

        const titleMap = {
            superadmin: "System Controller",
            admin: "Platform Admin",
            trainer: "Senior Trainer",
            student: "Student Learner"
        };

        const newUser = {
            name,
            email,
            password,
            role,
            organisation,
            title: titleMap[role] || "User"
        };

        // Add to local registrations list so they can log in next time
        savedUsers.push(newUser);
        localStorage.setItem("lms_registered_users", JSON.stringify(savedUsers));

        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <section className={styles.loginSection}>

            {/* Authentication card */}
            <div className={styles.loginFormBox} style={{ height: "min(720px, 95vh)" }}>

                <div className={styles.loginFormValue}>

                    <form onSubmit={handleSubmit}>

                        <img
                             src="/logo-light.png"
                             alt="Xebia Logo"
                             width={200}
                             height={70}
                             className={styles.Xebialogo}
                        />

                        <h2 className={styles.loginHeading}>
                            Create Account
                        </h2>

                        <p className={styles.loginSubHeading} style={{ marginBottom: "15px" }}>
                            Join the Xebia Learning Platform
                        </p>

                        {error && (
                            <div style={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", marginBottom: "12px", fontWeight: "600" }}>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ color: "#10b981", fontSize: "0.85rem", textAlign: "center", marginBottom: "12px", fontWeight: "600" }}>
                                {success}
                            </div>
                        )}

                        {/* Name field */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <MdOutlinePerson className={styles.icon} />
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="name">Full Name</label>
                        </div>

                        {/* Email field */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <MdAlternateEmail className={styles.icon} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>

                        {/* Role field dropdown */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className={styles.selectField}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1em",
                                    color: "var(--text-primary)",
                                    padding: "0 35px 0 5px",
                                    cursor: "pointer",
                                    appearance: "none",
                                    fontWeight: "500"
                                }}
                            >
                                <option value="student" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Student</option>
                                <option value="trainer" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Trainer</option>
                                <option value="admin" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Admin</option>
                                <option value="superadmin" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Superadmin</option>
                            </select>
                            <label htmlFor="role" style={{ transform: "translateY(-23px)", fontSize: "0.8em" }}>Platform Role</label>
                        </div>

                        {/* Organisation field dropdown */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <select
                                id="organisation"
                                value={organisation}
                                onChange={(e) => setOrganisation(e.target.value)}
                                className={styles.selectField}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1em",
                                    color: "var(--text-primary)",
                                    padding: "0 35px 0 5px",
                                    cursor: "pointer",
                                    appearance: "none",
                                    fontWeight: "500"
                                }}
                            >
                                <option value="Xebia" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Xebia</option>
                                <option value="Google" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Google</option>
                                <option value="Microsoft" style={{ background: "var(--background)", color: "var(--text-primary)" }}>Microsoft</option>
                            </select>
                            <label htmlFor="organisation" style={{ transform: "translateY(-23px)", fontSize: "0.8em" }}>Organization Membership</label>
                        </div>

                        {/* Password field */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <MdOutlineLock className={styles.icon} />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        {/* Confirm Password field */}
                        <div className={styles.inputBox} style={{ marginBottom: "22px" }}>
                            <MdOutlineLock className={styles.icon} />
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>

                        <button
                            type="submit"
                            className={styles.loginButton}
                            style={{ marginTop: "10px" }}
                        >
                            Register
                        </button>

                        <div className={styles.signup}>
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className={styles.loginFooter} style={{ marginTop: "15px" }}>
                            © 2026 Xebia Learning Platform. All rights reserved.
                        </div>

                    </form>

                </div>

            </div>

        </section>
    );
}
