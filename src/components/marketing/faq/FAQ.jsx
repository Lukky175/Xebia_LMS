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
            <section
                className="
                    relative
                    flex
                    h-[40vh]
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[url('/Login.png')]
                    bg-cover
                    bg-center
                    bg-fixed
                    before:absolute
                    before:inset-0
                    before:bg-black/65
                    after:absolute
                    after:bottom-[-1px]
                    after:left-0
                    after:h-[15px]
                    after:w-full
                    after:pointer-events-none
                    after:bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.15)_50%,var(--background)_100%)]
                "
            >
                <div className="relative z-10 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                        Frequently Asked Questions
                    </h1>

                    <p className="text-lg text-white/85">
                        Everything you need to know
                        <br className="sm:hidden" />
                        about our learning platform.
                    </p>
                </div>
            </section>


            {/* Main FAQ content consisting of informational text and accordion items. */}
            <section className="relative overflow-hidden bg-[var(--background-ui)] px-[8%] py-24">

                {/* Decorative Background Blobs */}
                <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">

                    {/* Left Content */}
                    <div className="lg:sticky lg:top-28">

                        <span className="text-sm font-bold tracking-[2px] text-[var(--primary-color)]">
                            FAQ
                        </span>

                        <h2 className="mt-4 text-4xl font-bold leading-tight text-[var(--text-primary)] lg:text-6xl">
                            Frequently Asked
                            <br />
                            <span className="text-[var(--primary-second-color)]">
                                Questions
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[450px] leading-8 text-[var(--text-secondary)]">
                            Find answers to common questions about enrollment,
                            certifications, support, and course accessibility.
                            We're here to make your learning journey seamless.
                        </p>

                    </div>

                    {/* Accordion Card */}
                        <div className="flex flex-col gap-4">

                            {faqItems.map((item, index) => (

                                <div
                                    key={index}
                                    className={`
                                        overflow-hidden
                                        rounded-[18px]
                                        border-2
                                        bg-[var(--background)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5

                                        ${
                                            activeIndex === index
                                                ? "border-[#521e49] shadow-lg"
                                                : "border-[var(--primary-color)]"
                                        }
                                    `}
                                >

                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            p-7
                                            text-left
                                            text-[1.1rem]
                                            font-semibold
                                            text-[var(--text-primary)]
                                        "
                                    >

                                        <span>{item.question}</span>

                                        <div
                                            className={`
                                                flex
                                                h-[42px]
                                                w-[42px]
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                text-white
                                                transition-all
                                                duration-300

                                                ${
                                                    activeIndex === index
                                                        ? "rotate-180 bg-[var(--primary-color)]"
                                                        : "bg-[var(--primary-second-color)]"
                                                }
                                            `}
                                        >
                                            {activeIndex === index
                                                ? <FiMinus />
                                                : <FiPlus />}
                                        </div>

                                    </button>

                                    <div
                                        className={`
                                            overflow-hidden
                                            transition-all
                                            duration-500
                                            ease-in-out
                                            ${
                                                activeIndex === index
                                                    ? "max-h-[500px]"
                                                    : "max-h-0"
                                            }
                                        `}
                                    >

                                        <div className="px-7 pb-7 leading-8 text-[var(--text-secondary)]">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
            </section>

            {/* Call-to-action encouraging users to
                reach out if their questions remain unanswered. */}
            {/* Help Section */}
            <section className="bg-[var(--background)] px-[8%] py-20">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-2xl
                    "
                >

                    <img
                        src="/xebia-office.jpg"
                        alt=""
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover object-center
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-black/75
                            via-black/60
                            to-black/70
                        "
                    />

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            flex
                            max-w-4xl
                            flex-col
                            items-center
                            px-10
                            py-28
                            text-center
                        "
                    >

                        <h2
                            className="
                                text-5xl
                                font-bold
                                text-white
                            "
                        >
                            Still have questions?
                        </h2>

                        <p
                            className="
                                mt-6
                                max-w-2xl
                                text-lg
                                text-white/85
                            "
                        >
                            Need help with enrollment, certifications, or your learning journey? Our team is always happy to assist you.
                        </p>
                        <div className="mt-10">
                            <a
                                href="/contact"
                                className="
                                    rounded-full
                                    bg-[var(--primary-color)]
                                    px-8
                                    py-4
                                    font-semibold
                                    text-white
                                    transition-all
                                    hover:-translate-y-1
                                "
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
        </>
    );
}