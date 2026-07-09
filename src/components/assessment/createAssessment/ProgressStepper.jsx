/*
==========================================================
Progress Stepper

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays the user's progress through the
Assessment Creation Wizard.

Responsibilities

• Visualize the current wizard step.
• Display completed, active and upcoming steps.
• Show overall progress.
• Guide users through the assessment creation flow.

Architecture

CreateAssessmentModal
        │
        ▼
ProgressStepper
        │
        ▼
Visual Wizard Progress

Notes

This component is purely presentational.

It does not control navigation.
It only reflects the current wizard state
provided by the parent component.
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./ProgressStepper.module.css";

/* ============================
   Icons
============================ */
import {
    FiFileText,
    FiCpu,
    FiHelpCircle,
    FiCheckCircle,
    FiCheck
} from "react-icons/fi";

/*
==========================================================
Wizard Configuration

Defines every step displayed by the progress
indicator.

Each step contains

• Unique identifier
• Display title
• Supporting description
• Icon

Adding or removing wizard steps only requires
updating this configuration.
==========================================================
*/
const STEPS = [
    {
        id: 1,
        title: "Basic Details",
        subtitle: "Configure assessment",
        icon: FiFileText
    },

    {
        id: 2,
        title: "Creation Method",
        subtitle: "Choose workflow",
        icon: FiCpu
    },

    {
        id: 3,
        title: "Questions",
        subtitle: "Build assessment",
        icon: FiHelpCircle
    },

    {
        id: 4,
        title: "Review",
        subtitle: "Publish",
        icon: FiCheckCircle
    }

];

/**
 * ProgressStepper
 *
 * Displays the user's progress through the
 * Assessment Creation Wizard.
 *
 * Props
 * -----
 * currentStep
 *      Current wizard step.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function ProgressStepper({

    currentStep

}) {

/*
==========================================================
Progress Calculation

Converts the current wizard step into a
percentage used by the progress bar.

Example

Step 1 → 0%

Step 2 → 33%

Step 3 → 66%

Step 4 → 100%
==========================================================
*/
    const progress = ((currentStep - 1) / (STEPS.length - 1)) *100;

    /*
==========================================================
Component Layout

1. Background Progress Track

2. Animated Progress Indicator

3. Wizard Steps

Each step contains

• Status Circle
• Icon
• Title
• Subtitle

==========================================================
*/
    return (

        <div className={styles.container}>

{/* ==========================================
    Progress Track

    Displays the complete wizard journey.

    The filled portion represents the user's
    current progress.
========================================== */}

            <div className={styles.track}>
                <div
                    className={styles.progress}
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>
            {/* ==========================================
                Wizard Steps

                Render one visual step for every item
                defined in the STEPS configuration.

                Each step can be

                • Completed
                • Active
                • Upcoming
            ========================================== */}
            {
                STEPS.map((step) => {
                    const Icon = step.icon;
                    /*
                    Determine the visual state of the step.

                    Completed
                        Current step has already passed.

                    Active
                        User is currently on this step.

                    Upcoming
                        User has not yet reached this step.
                    */
                    const active =
                        currentStep === step.id;
                    const completed =
                        currentStep > step.id;
                    return (
                        <div key={step.id} className={styles.step}>
                            {/* Step indicator.

                                Displays either

                                • Step icon
                                • Completion checkmark */}
                            <div className=
                                {`
                                    ${styles.circle}
                                    ${
                                        active
                                            ? styles.active
                                            : ""
                                    }
                                    ${
                                        completed
                                            ? styles.completed
                                            : ""
                                    }
                                `}
                            >
                                {/* Replace the original icon with a
                                    checkmark once the step has been
                                    completed. */}
                                {
                                    completed
                                        ?
                                        <FiCheck size={18}/>
                                        :
                                        <Icon size={18}/>
                                }
                            </div>

                            <div
                                className={styles.text}
                            >
                                {/* Highlight active and completed steps
                                    to improve visual navigation. */}
                                <h4
                                    className={`
                                        ${styles.title}
                                        ${
                                            active ||
                                            completed
                                                ? styles.highlight
                                                : ""
                                        }
                                    `}
                                >
                                    {step.title}
                                </h4>

                                <p>
                                    {step.subtitle}
                                </p>
                            </div>
                        </div>
                    );
                })
            }
        </div>

    );

}