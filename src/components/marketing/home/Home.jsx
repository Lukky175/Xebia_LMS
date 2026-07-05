/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/home/Home.jsx
 *
 * Purpose:
 * Renders the public landing page of the application.
 *
 * Responsibilities:
 * - Introduce the Xebia LMS platform.
 * - Highlight key platform features.
 * - Showcase enterprise success metrics.
 * - Present customer testimonials.
 * - Encourage user onboarding through
 *   clear calls-to-action.
 *
 * Dependencies:
 * - Next.js Image component for optimized assets.
 * - React Icons for feature illustrations.
 * - CSS Modules for component-scoped styling.
 *
 * ==========================================================
 */

import { Link } from "react-router-dom";
import styles from "./Home.module.css";

import {
    FiBookOpen,
    FiShield,
    FiLayers,
} from "react-icons/fi";

/**
 * Home Component
 *
 * @returns {JSX.Element}
 * A complete landing page consisting of:
 * - Hero section
 * - Platform statistics
 * - Feature highlights
 * - Customer testimonial
 * - Final call-to-action
 */

export default function Home() {

    return (
        <>

            {/* Hero banner introducing the platform
                and directing users toward primary actions. */}
            <section className={styles.heroSection}>

                <div className={styles.heroOverlay}>

                    <span className={styles.heroTag}>
                        ENTERPRISE LEARNING PLATFORM
                    </span>

                    <h1>
                        Innovation & Learning
                        <br />
                        Without <span>Boundaries</span>
                    </h1>

                    <p>
                        Empower your workforce with a modern,
                        scalable, and intelligent learning
                        ecosystem designed for enterprise growth.
                    </p>

                    <div className={styles.heroButtons}>

                        <Link
                            to="/login"
                            className={styles.primaryButton}
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/contact"
                            className={styles.secondaryButton}
                        >
                            Contact Us
                        </Link>

                    </div>

                </div>

            </section>


            {/* High-level platform metrics used to
                establish trust and social proof. */}

            <section className={styles.statsSection}>

                <div>
                    <h2>98%</h2>
                    <p>Completion Rate</p>
                </div>

                <div>
                    <h2>500+</h2>
                    <p>Expert Courses</p>
                </div>

                <div>
                    <h2>1.2M</h2>
                    <p>Active Learners</p>
                </div>

            </section>


            {/* Core platform capabilities and
                enterprise learning advantages. */}

            <section className={styles.featuresSection}>

                <div className={styles.featuresHeader}>

                    <span>
                        WHY XEBIA LMS
                    </span>

                    <h2>
                        Crafting The Future
                        <br />
                        Of Workforce Development
                    </h2>

                    <p>
                        Deeply integrated learning
                        solutions that prioritize
                        clarity, collaboration,
                        performance, and meaningful
                        organizational growth.
                    </p>

                </div>

                {/* Each card represents a major pillar
                    of the Xebia learning ecosystem. */}
                <div className={styles.featureGrid}>

                    <div className={styles.featureCard}>

                        <div className={styles.iconBox}>
                            <FiBookOpen />
                        </div>

                        <h3>
                            Adaptive Learning
                        </h3>

                        <p>
                            Personalized learning
                            experiences tailored
                            to every employee.
                        </p>

                    </div>


                    <div className={styles.featureCard}>

                        <div className={styles.iconBox}>
                            <FiShield />
                        </div>

                        <h3>
                            Enterprise Security
                        </h3>

                        <p>
                            Role-based access,
                            SSO integration,
                            and enterprise-grade
                            protection.
                        </p>

                    </div>


                    <div className={styles.featureCard}>

                        <div className={styles.iconBox}>
                            <FiLayers />
                        </div>

                        <h3>
                            Modular Content
                        </h3>

                        <p>
                            Build, manage, and
                            scale learning assets
                            with ease.
                        </p>

                    </div>

                </div>

            </section>


            {/* Customer success story highlighting
                measurable business impact. */}

            <section className={styles.testimonialSection}>

                <div className={styles.testimonialGrid}>

                    <div>

                        <span className={styles.sectionLabel}>
                            CTO PERSPECTIVE
                        </span>

                        <p>
                            “Xebia transformed our internal
                            learning ecosystem. The platform
                            became the foundation of our
                            engineering excellence.”
                        </p>

                        <div className={styles.author}>

                            <img
                                src="/avatar.png"
                                width={60}
                                height={60}
                                alt="Avatar"
                            />

                            <div>

                                <h4>
                                    Sarah Jenkins
                                </h4>

                                <span>
                                    CTO, Global Dynamics
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className={styles.quoteCard}>

                        <div className={styles.line} />

                        <h3>
                            Measurable ROI
                        </h3>

                        <p>
                            Since implementation,
                            organizations reported
                            faster onboarding,
                            improved retention,
                            and stronger employee
                            growth paths.
                        </p>

                    </div>

                </div>

            </section>


            {/* Final conversion section encouraging
                users to begin their learning journey. */}

            <section className={styles.ctaSection}>

                <div className={styles.ctaCard}>

                    <span>
                        Ready To Transform
                        Your Learning Culture?
                    </span>

                    <h2>
                        Join over 1.2 million
                        professionals building
                        the future.
                    </h2>

                    <div className={styles.ctaButtons}>

                        <Link
                            to="/login"
                            className={styles.primaryButton}
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/contact"
                            className={styles.secondaryButton}
                        >
                            Contact Sales
                        </Link>

                    </div>

                </div>

            </section>

        </>
    );
}