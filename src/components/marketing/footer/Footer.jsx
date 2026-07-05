/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/footer/Footer.jsx
 *
 * Purpose:
 * Renders the global footer displayed across all
 * public-facing pages of the application.
 *
 * Responsibilities:
 * - Display company branding and mission statement.
 * - Provide quick navigation links.
 * - Surface helpful resources.
 * - Show organization contact information.
 * - Maintain responsive behaviour across devices.
 *
 * Notes:
 * - Internal navigation uses Next.js Link components.
 * - External resources are currently placeholders and
 *   will be connected in future iterations.
 * ==========================================================
 */

import { Link } from "react-router-dom";

import styles from "./Footer.module.css";

/**
 * Footer Component
 *
 * @returns {JSX.Element}
 * A reusable application footer containing:
 * - Brand identity
 * - Navigation links
 * - Resource shortcuts
 * - Contact information
 * - Copyright notice
 */
export default function Footer() {

    return (

        <footer className={styles.footer}>

            <div className={styles.footerContainer}>
                {/* Brand identity and company mission statement. */}
                <div className={styles.footerBrand}>

                    <img
                        src="/logo-light.png"
                        width={180}
                        height={80}
                        alt="Xebia"
                    />

                    <p>
                        Empowering organizations through
                        cloud, DevOps, AI, and digital
                        transformation.
                    </p>

                </div>

                {/* Internal navigation links for public pages. */}
                <div>

                    <h4>Company</h4>

                    <Link to="/home">
                        Home
                    </Link>

                    <Link to="/faq">
                        FAQ
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </div>

                {/* Helpful resources and learning materials.
                    Links are placeholders for future pages. */}
                <div>

                    <h4>Resources</h4>

                    <a href="#">
                        Course Catalog
                    </a>

                    <a href="#">
                        Case Studies
                    </a>

                    <a href="#">
                        Blog
                    </a>

                </div>

                {/* Organization contact information. */}
                <div>

                    <h4>Get In Touch</h4>

                    <p>
                        Gurugram, Haryana
                    </p>

                    <p>
                        +91 124 664 7000
                    </p>

                    <p>
                        contact@xebia.com
                    </p>

                </div>

            </div>

            {/* Global copyright information displayed
                at the bottom of every page. */}
            <div className={styles.copyright}>
                © 2026 Xebia. All rights reserved.
            </div>

        </footer>

    );
}