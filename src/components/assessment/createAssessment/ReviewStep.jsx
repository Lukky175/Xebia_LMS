/*
==========================================================
Review Step

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Represents the final step of the Assessment
Creation Wizard.

Provides a read-only summary of the entire
assessment before it is created.

Responsibilities

• Display assessment details.
• Display assignment information.
• Display assessment configuration.
• Display question statistics.
• Verify assessment completeness before
  submission.

Architecture

CreateAssessmentModal
        │
        ▼
ReviewStep
        │
        ▼
draftAssessment
        │
        ▼
Create Assessment API

Notes

This component never modifies assessment
data.

Its responsibility is to present the final
draft exactly as it will be submitted to
the backend.

Future Enhancements

• Validation Summary
• Missing Field Warnings
• Question Preview
• Estimated Assessment Duration
• Publish Confirmation
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./ReviewStep.module.css";

/* ============================
   Mock Data
============================ */
import { courseOptions, batchOptions, universityOptions } from "../../../data/assessments";

/* ==========================================
   Creation Method Labels

   Maps internal creation method identifiers
   to user-friendly labels displayed in the
   review summary.

   Later these values can also be supplied
   by the backend without changing the UI.
========================================== */

const CREATION_METHOD_LABELS = {

    manual: "Create Manually",

    ai: "Generate with AI",

    pdf: "Upload PDF"

};

/**
 * ReviewStep
 *
 * Displays a read-only summary of the
 * assessment draft before creation.
 *
 * Props
 * -----
 * draftAssessment
 *      Complete assessment draft created
 *      throughout the wizard.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function ReviewStep({

    draftAssessment

}){

    /* ==========================================
    Draft Assessment

    Extract the sections required for
    displaying the review summary.
    ========================================== */
    const {
        basicInfo,
        creationMethod,
        questions
    } = draftAssessment;
    /* ==========================================
    Resolve Selected Labels

    Converts arrays of selected IDs into
    readable names.

    Example

    [1,3]

    becomes

    React, Java

    This helper currently resolves values
    from mock data.

    Later it will work with API responses
    without changing the UI.
    ========================================== */
    const getLabels = (ids, options) =>
        options
            .filter(option => ids.includes(option.id))
            .map(option => option.label)
            .join(", ") || "—";

    /* ==========================================
    Question Statistics

    Count the number of questions belonging
    to each supported question type.

    These statistics are displayed in the
    Question Summary section.
    ========================================== */
    const counts = questions.reduce(
        (summary, question) => {
            summary[question.questionType]++;
            return summary;
        },
        {
            single:0,
            multiple:0,
            truefalse:0,
            subjective:0,
            fillblank:0
        }
    );

    /*
    ==========================================================
    Component Layout

    Assessment Details

    ↓

    Assignment

    ↓

    Configuration

    ↓

    Question Summary

    ==========================================================
    */
    return(
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <h2>
                    Review Assessment
                </h2>
                <p>
                    Verify all details before publishing the assessment.
                </p>
            </div>
            {/* ==========================================
                Assessment Details

                Displays the core information entered
                during Step 1 of the wizard.
            ========================================== */}

            <section className={styles.card}>
                <h3>
                    Assessment Details
                </h3>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Assessment Title
                        </label>

                        <span>
                            {basicInfo.title || "—"}
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Assessment Type
                        </label>

                        <span>
                            {basicInfo.type || "MCQ"}
                        </span>
                    </div>

                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label>
                            Description
                        </label>

                        <span>
                            {basicInfo.description || "—"}
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Difficulty
                        </label>

                        <span>
                            {basicInfo.difficulty || "Easy"}
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Trainer
                        </label>

                        <span>
                            {basicInfo.trainer || "—"}
                        </span>
                    </div>
                </div>

                {/* Display thumbnail preview if one has been uploaded by the user. */}
                {
                    basicInfo.thumbnail?.preview &&
                    <img
                        src={basicInfo.thumbnail.preview}
                        alt="Thumbnail"
                        className={styles.thumbnail}
                    />
                }

            </section>

            {/* ==========================================
                Assignment

                Display the selected Courses, Batches
                and Universities that will receive the
                assessment.
            ========================================== */}

            <section className={styles.card}>
                <h3>
                    Assignment
                </h3>
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Courses
                        </label>

                        <span>
                            {
                                getLabels(
                                    basicInfo.courses,
                                    courseOptions
                                )
                            }
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Batches
                        </label>

                        <span>
                            {
                                getLabels(
                                    basicInfo.batches,
                                    batchOptions
                                )
                            }
                        </span>
                    </div>

                    <div className={`${styles.field} ${styles.fullWidth}`}>
                        <label>
                            Universities
                        </label>

                        <span>
                            {
                                getLabels(
                                    basicInfo.universities,
                                    universityOptions
                                )
                            }
                        </span>
                    </div>
                </div>
            </section>

            {/* ==========================================
                Assessment Configuration

                Display scheduling and assessment
                behaviour configured during the wizard.
            ========================================== */}

            <section className={styles.card}>
                <h3>
                    Assessment Configuration
                </h3>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Duration
                        </label>

                        <span>
                            {basicInfo.duration || "—"} Minutes
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Passing Marks
                        </label>

                        <span>
                            {basicInfo.passingMarks || "—"}
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Due Date
                        </label>

                        <span>
                            {basicInfo.dueDate || "—"}
                        </span>
                    </div>

                    <div className={styles.field}>
                        <label>
                            Creation Method
                        </label>

                        <span>
                            {
                                CREATION_METHOD_LABELS[creationMethod] ||
                                "Unknown Method"
                            }
                        </span>
                    </div>
                </div>

            </section>

            {/* ==========================================
                Question Summary

                Displays an overview of all questions
                grouped by question type.

                Helps the trainer verify assessment
                composition before submission.
            ========================================== */}

            <section className={styles.card}>
                <h3>
                    Question Summary
                </h3>

                <div className={styles.summaryGrid}>
                    <div>
                        <span>Total Questions</span>
                        <strong>
                            {questions.length}
                        </strong>
                    </div>

                    <div>
                        <span>Single Choice</span>
                        <strong>
                            {counts.single}
                        </strong>
                    </div>

                    <div>
                        <span>Multiple Choice</span>
                        <strong>
                            {counts.multiple}
                        </strong>
                    </div>

                    <div>
                        <span>True / False</span>
                        <strong>
                            {counts.truefalse}
                        </strong>
                    </div>

                    <div>
                        <span>Subjective</span>
                        <strong>
                            {counts.subjective}
                        </strong>
                    </div>

                    <div>
                        <span>Fill in Blank</span>
                        <strong>
                            {counts.fillblank}
                        </strong>
                    </div>
                </div>
            </section>
        </div>
    );

}

/*
This review screen displays the exact
assessment draft that will eventually be
submitted to the Create Assessment API.

No additional transformations should occur
after this point except server-side
validation.
*/