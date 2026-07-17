/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/navbar/Navbar.jsx
 *
 * Purpose:
 * Renders the global navigation bar used across
 * public-facing and authentication pages.
 *
 * Responsibilities:
 * - Display company branding.
 * - Provide primary navigation links.
 * - Allow users to toggle between light and dark themes.
 * - Surface the primary call-to-action.
 * - Maintain a consistent user experience throughout
 *   the application.
 *
 * Dependencies:
 * - Next.js Link for client-side navigation.
 * - Next.js Image for optimized logo rendering.
 * - ThemeContext for theme state management.
 * - React Icons for theme toggle indicators.
 *
 * ==========================================================
 */
import { Link } from "react-router-dom";

import {
    MdOutlineDarkMode,
    MdOutlineLightMode,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";

import { useTheme } from "@/context/ThemeContext.jsx";

import styles from "./Navbar.module.css";

/**
 * Navbar Component
 *
 * @returns {JSX.Element}
 * A fixed navigation bar containing:
 * - Company logo
 * - Primary navigation links
 * - Theme switcher
 * - Login/Get Started action
 */
export default function Navbar() {
    // Retrieve the current application theme
    // and the function responsible for toggling
    // between light and dark modes.
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.navbar}>

            <div className={styles.container}>

                {/* Left Section */}
                {/* Brand identity and homepage navigation. */}
                <Link
                    to="/home"
                    className={styles.logoContainer}
                >
                    <img
                        src={
                            "/logo-light.png"
                        }
                        alt="Xebia Logo"
                        className={styles.logo}
                    />
                </Link>

                {/* Middle Section */}
                {/* Primary navigation links for public pages. */}
                <div className={styles.links}>
                    <Link to="/home">
                        <AiOutlineHome />
                        <span>Home</span>
                    </Link>

                    <span className={styles.divider}>
                        |
                    </span>

                    <Link to="/faq">
                        <LuMessageCircleMore />
                        <span>FAQ</span>
                    </Link>

                    <span className={styles.divider}>
                        |
                    </span>
                    
                    <Link to="/contact">
                        <IoCallOutline />
                        <span>Contact Us</span>
                    </Link>
                </div>

                {/* Right Section */}
                {/* Naviagte to /login & includes theme switching
                    and the primary onboarding CTA. */}
                <div className={styles.actions}>
                    {/* Toggle between light and dark themes.
                        The displayed icon represents the action
                        that will occur when the button is pressed. */}
                    <button
                        className={styles.themeButton}
                        onClick={toggleTheme}
                    >
                        {
                            theme === "light"
                                ? <MdOutlineDarkMode />
                                : <MdOutlineLightMode />
                        }
                    </button>

                    <span className={styles.divider}>
                        |
                    </span>

                    <Link
                        to="/login"
                        className={styles.ctaButton}
                    >
                        Get Started
                    </Link>

                </div>

            </div>

        </nav>
    );
}