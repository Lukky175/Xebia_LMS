/**
 * ==========================================================
 * Author       : Lakshit Tyagi
 * Organization : Xebia
 * Project      : Xebia Learning Management System (LMS)
 * File         : src/components/faq/FAQ.jsx
 *
 * Purpose:
 * Renders the Frequently Asked Questions (FAQ) page
 * for the platform.
 *
 * Responsibilities:
 * - Display commonly asked questions and answers.
 * - Provide an interactive accordion interface.
 * - Maintain a clean and responsive user experience.
 * - Redirect users to the Contact page when
 *   additional assistance is required.
 *
 * Dependencies:
 * - React useState hook for accordion state management.
 * - FAQ data from faqData.js.
 * - React Icons for expand/collapse indicators.
 *
 * ==========================================================
 */

import { useState } from "react";

import styles from "./FAQ.module.css";

import { faqItems } from "./faqData";

import { FiPlus, FiMinus } from "react-icons/fi";

/**
 * FAQ Component
 *
 * @returns {JSX.Element}
 * A complete FAQ page containing:
 * - Hero banner
 * - Introduction section
 * - Interactive accordion questions
 * - Contact call-to-action section
 */
export default function FAQ() {
    // Stores the index of the currently expanded FAQ item.
    // A value of null indicates that no question is open.
    const [activeIndex, setActiveIndex] = useState(null);
    /**
     * Expands or collapses a FAQ item.
     *
     * @param {number} index
     * The index of the clicked question.
     *
     * Behaviour:
     * - Clicking an open item closes it.
     * - Clicking a different item opens that item
     *   and closes the previously expanded question.
     */
    const toggleQuestion = (index) => {
        setActiveIndex((prev) =>
            prev === index ? null : index
        );
    };

    return (
        <>

            {/* Hero banner introducing the FAQ page. */}
            <section className={styles.heroSection}>

                <div className={styles.heroOverlay}>

                    <h1>
                        Frequently Asked Questions
                    </h1>

                    <p>
                        Everything you need to know
                        about our learning platform.
                    </p>

                </div>

            </section>


            {/* Main FAQ content consisting of informational text and accordion items. */}
            <section className={styles.faqSection}>

                <div className={styles.faqGrid}>

                    {/* Introductory content explaining the purpose and scope of the FAQ section. */}
                    <div className={styles.leftContent}>

                        <span className={styles.sectionTag}>
                            FAQ
                        </span>

                        <h2>
                            Frequently Asked
                            <br />
                            <span>Questions</span>
                        </h2>

                        <p>
                            Find answers to common
                            questions about enrollment,
                            certifications, support,
                            and course accessibility.
                            We're here to make your
                            learning journey seamless.
                        </p>

                    </div>


                    {/* Dynamically render FAQ items from faqData.js. Each item behaves as an accordion panel. */}
                    <div className={styles.rightContent}>
                        {/* Each FAQ item contains:
                            - A clickable question button
                            - A toggle icon (+ / -)
                            - A collapsible answer container */}
                        {faqItems.map(
                            (item, index) => (

                                <div
                                    key={index}
                                    className={
                                        styles.faqItem
                                    }
                                >

                                    <button
                                        className={
                                            styles.question
                                        }

                                        onClick={() =>
                                            toggleQuestion(index)
                                        }
                                    >

                                        <span>
                                            {
                                                item.question
                                            }
                                        </span>

                                        <div
                                            className={
                                                styles.icon
                                            }
                                        >

                                            {
                                                activeIndex === index
                                                    ? <FiMinus />
                                                    : <FiPlus />
                                            }

                                        </div>

                                    </button>

                                    {/* CSS transitions handle the accordion
                                        expand/collapse animation by toggling
                                        the "open" class. */}
                                    <div
                                        className={`${styles.answerWrapper}
                                        ${
                                            activeIndex === index
                                                ? styles.open
                                                : ""
                                        }`}
                                    >

                                        <div
                                            className={
                                                styles.answer
                                            }
                                        >

                                            {
                                                item.answer
                                            }

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            </section>

            {/* Call-to-action encouraging users to
                reach out if their questions remain unanswered. */}
            <section className={styles.helpSection}>

                <h2>
                    Still have questions?
                </h2>

                <p>
                    Our team is always happy
                    to help you.
                </p>

                <a
                    href="/contact"
                    className={styles.helpButton}
                >
                    Contact Us
                </a>

            </section>
            
        </>
    );
}