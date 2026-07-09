/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/contact/ContactForm.jsx
 *
 * Purpose:
 * Renders the Contact page of the application.
 *
 * Responsibilities:
 * - Display organization contact information.
 * - Provide a user-friendly contact form interface.
 * - Show the organization's physical location using
 *   an embedded Google Maps iframe.
 * - Maintain responsive behaviour across devices.
 *
 * Notes:
 * - This component is currently presentation-only.
 * - Form validation, state management, and API
 *   integration will be implemented in future releases.
 * ==========================================================
 */

import styles from "./ContactForm.module.css";

import {
    IoPersonOutline,
    IoCallOutline,
    IoLocationOutline
} from "react-icons/io5";

import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoPencil } from "react-icons/go";


/**
 * ContactForm Component
 *
 * @returns {JSX.Element}
 * A complete contact page consisting of:
 * - Hero section
 * - Company information panel
 * - Contact form
 * - Embedded office location map
 */
export default function ContactForm() {
    return (
        <>
            {/* HERO */}
            <section className={styles.heroSection}>
                <div className={styles.heroOverlay}>

                    <h1>Contact Us</h1>

                    <p>
                        Let's build something great together.
                    </p>

                </div>
            </section>


            {/* CONTACT */}
            <section className={styles.contactSection}>

                <div className={styles.contactContainer}>

                    {/* Company information section containing
                        office location, email, and phone details. */}
                    <div className={styles.contactInfo}>

                        <span className={styles.sectionTag}>
                            CONTACT
                        </span>

                        <h2>Get In Touch</h2>

                        <p className={styles.infoDescription}>
                            At Xebia, we help organizations transform
                            their businesses through cloud solutions,
                            automation, DevOps practices, and modern
                            software engineering.
                        </p>


                        <div className={styles.infoItem}>

                            <IoLocationOutline />

                            <div>
                                <h4>Our Office</h4>

                                <p>
                                    4th Floor, Capital Cyberscape,
                                    Sector-59, Golf Course Ext Rd,
                                    Gurugram, Haryana 122005
                                </p>
                            </div>

                        </div>


                        <div className={styles.infoItem}>

                            <MdOutlineAlternateEmail />

                            <div>
                                <h4>Email Us</h4>

                                <p>contact@xebia.com</p>
                            </div>

                        </div>


                        <div className={styles.infoItem}>

                            <IoCallOutline />

                            <div>
                                <h4>Call Us</h4>

                                <p>+91 124 664 7000</p>
                            </div>

                        </div>

                    </div>


                    {/* Contact form section.
                        Currently UI-only and not connected to a backend API. */}
                    <div className={styles.contactFormBox}>
                        {/* Floating-label inputs rely on an empty
                            placeholder value (" ") so CSS can detect
                            whether the field contains user input. */}
                        <form>

                            <div className={styles.row}>

                                <div className={styles.inputBox}>
                                    <IoPersonOutline className={styles.icon} />

                                    <input
                                        type="text"
                                        placeholder=" "
                                        required
                                    />

                                    <label>
                                        First Name
                                    </label>
                                </div>


                                <div className={styles.inputBox}>
                                    <IoPersonOutline className={styles.icon} />

                                    <input
                                        type="text"
                                        placeholder=" "
                                        required
                                    />

                                    <label>
                                        Last Name
                                    </label>
                                </div>

                            </div>


                            <div className={styles.row}>

                                <div className={styles.inputBox}>

                                    <IoCallOutline
                                        className={styles.icon}
                                    />

                                    <input
                                        type="tel"
                                        placeholder=" "
                                        required
                                    />

                                    <label>
                                        Phone Number
                                    </label>

                                </div>


                                <div className={styles.inputBox}>

                                    <MdOutlineAlternateEmail
                                        className={styles.icon}
                                    />

                                    <input
                                        type="email"
                                        placeholder=" "
                                        required
                                    />

                                    <label>Email</label>

                                </div>

                            </div>


                            <div className={styles.inputBox}>

                                <GoPencil
                                    className={styles.icon}
                                />

                                <input
                                    type="text"
                                    placeholder=" "
                                />

                                <label>Subject</label>

                            </div>


                            <div className={styles.textAreaBox}>

                                <textarea
                                    rows="5"
                                    placeholder=" "
                                    required
                                />

                                <label>Message</label>

                            </div>


                            <button
                                className={styles.submitButton}
                            >
                                Send Message
                            </button>

                        </form>

                    </div>

                </div>

            </section>


            {/* MAP */}
            {/* Embedded Google Maps location of the
            Xebia Gurugram office. Lazy loading is
            enabled to improve page performance. */}
            
            {/* This will be removed Later */}
            <section className={styles.mapSection}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112307.71102573197!2d76.95183469726562!3d28.4006649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d185739027321%3A0xe216dd164e734c08!2sXebia!5e0!3m2!1sen!2sin!4v1782627472280!5m2!1sen!2sin" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
                </iframe>
            </section>

        </>
    );
}