/*
==========================================================
Basic Information Step

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Represents the first step of the Assessment
Creation Wizard.

This step collects all metadata required to
define an assessment before questions are added.

Responsibilities

• Capture assessment metadata.
• Upload assessment thumbnail.
• Select associated courses.
• Select associated batches.
• Select associated universities.
• Configure assessment properties.
• Update the shared assessment draft.

Architecture

CreateAssessmentModal
        │
        ▼
BasicInfoStep
        │
        ▼
updateBasicInfo()
        │
        ▼
draftAssessment.basicInfo

Notes

This component does not maintain its own state.

All form values are stored inside the shared
assessment draft managed by
useAssessmentBuilder().

Future Integration

Dropdown values and trainer information will
be loaded from backend APIs.

Possible Endpoints

GET /api/courses

GET /api/batches

GET /api/universities

GET /api/trainers
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./BasicInfoStep.module.css";

/* ============================
   Child Components
============================ */
import ThumbnailUpload from "./ThumbnailUpload";
import MultiSelect from "./MultiSelect";

/* ============================
   Mock Data
============================ */
import {
    courseOptions,
    batchOptions,
    universityOptions
}
from "../../../data/assessments";

/* ==========================================
    Dropdown Options

    These are currently hardcoded.
    Later they will be fetched from backend
    APIs without changing the component.
    ========================================== */
    const assessmentTypes = [
        "MCQ",
        "Coding",
        "Assignment"
    ];

    const difficultyLevels = [
        "EASY",
        "INTERMEDIATE",
        "HARD"
    ];

/**
 * BasicInfoStep
 *
 * Collects the general information required
 * to create an assessment.
 *
 * Props
 * -----
 * draftAssessment
 *      Shared assessment draft object.
 *
 * updateBasicInfo
 *      Updates a single property inside the
 *      draft assessment.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function BasicInfoStep({

    draftAssessment,

    updateBasicInfo

}) {
    /*
    Reference to the Basic Information section of
    the shared assessment draft.

    Using a local reference keeps JSX cleaner while
    still updating the centralized draft state.
    */
    const basicInfo = draftAssessment.basicInfo;

    /*
    ==========================================================
    Component Layout

    Left Column

    • Title
    • Description
    • Courses
    • Batches
    • Universities

    Right Column

    • Thumbnail
    • Assessment Configuration

    ==========================================================
    */
    return (

        <div className={styles.container}>

            {/* ==========================================
                Assessment Details

                Collects the primary metadata required
                to identify and organize the assessment.
            ========================================== */}

            <div className={styles.leftSection}>

                {/* Assessment title displayed throughout
                    the LMS and learner dashboard. */}

                <div className={styles.formGroup}>

                    <label>

                        Assessment Title

                    </label>
                    {/* Controlled input.

                        Every keystroke updates the shared
                        assessment draft. */}
                    <input

                        type="text"

                        placeholder="Enter assessment title"

                        value={basicInfo.title}

                        onChange={(event)=>

                            updateBasicInfo(

                                "title",

                                event.target.value

                            )

                        }

                    />

                </div>

                {/* High-level overview of the assessment
                    shown to learners before they begin. */}

                <div className={styles.formGroup}>

                    <label>

                        Assessment Description

                    </label>

                    <textarea

                        rows={6}

                        placeholder="Describe this assessment..."

                        value={basicInfo.description}

                        onChange={(event)=>

                            updateBasicInfo(

                                "description",

                                event.target.value

                            )

                        }

                    />

                </div>

                {/* ==========================================
                    Assessment Scope

                    Determines where this assessment will
                    be available.

                    Multiple selections are supported for

                    • Courses
                    • Batches
                    • Universities

                ========================================== */}

                <MultiSelect

                    label="Courses"

                    placeholder="Select Courses"

                    options={courseOptions}

                    value={basicInfo.courses}

                    onChange={(values)=>

                        updateBasicInfo(

                            "courses",

                            values

                        )

                    }

                />

                <MultiSelect

                    label="Batches"

                    placeholder="Select Batches"

                    options={batchOptions}

                    value={basicInfo.batches}

                    onChange={(values)=>

                        updateBasicInfo(

                            "batches",

                            values

                        )

                    }

                />

                <MultiSelect

                    label="Universities"

                    placeholder="Select Universities"

                    options={universityOptions}

                    value={basicInfo.universities}

                    onChange={(values)=>

                        updateBasicInfo(

                            "universities",

                            values

                        )

                    }

                />

            </div>

            {/* ==========================================
                    Assessment Configuration

                    Configure additional assessment
                    properties such as

                    • Thumbnail
                    • Type
                    • Difficulty
                    • Trainer
                    • Duration
                    • Due Date
                    • Passing Marks

                ========================================== */}

            <div className={styles.rightSection}>

                {/* Assessment cover image displayed throughout the platform. */}
                <ThumbnailUpload

                    thumbnail={basicInfo.thumbnail}

                    onChange={(thumbnail)=>

                        updateBasicInfo(

                            "thumbnail",

                            thumbnail

                        )

                    }

                />

                <div className={styles.grid}>

                    {/* Defines how learners will complete this assessment. */}
                    <div className={styles.formGroup}>

                        <label>
                            Assessment Type
                        </label>

                        <select
                            value={basicInfo.type}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "type",
                                    event.target.value
                                )
                            }
                        >
                            {assessmentTypes.map((type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Indicates expected learner skill level. */}

                    <div className={styles.formGroup}>

                        <label>
                            Difficulty
                        </label>

                        <select
                            value={basicInfo.difficulty}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "difficulty",
                                    event.target.value
                                )
                            }
                        >
                            {difficultyLevels.map((difficulty) => (
                                <option
                                    key={difficulty}
                                    value={difficulty}
                                >
                                    {difficulty}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Trainer responsible for the assessment. */}

                    <div className={styles.formGroup}>
                        <label>
                            Trainer
                        </label>

                        <input
                            type="text"
                            placeholder="Trainer Name"
                            value={basicInfo.trainer}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "trainer",
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    {/* Time limit for completing the assessment. */}
                    <div className={styles.formGroup}>

                        <label>
                            Duration
                        </label>

                        <input
                            type="number"
                            placeholder="Minutes"
                            value={basicInfo.duration}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "duration",
                                    event.target.value
                                )
                            }
                        />

                    </div>

                    {/* Last date on which learners may attempt the assessment. */}
                    <div className={styles.formGroup}>

                        <label>
                            Due Date
                        </label>

                        <input
                            type="date"
                            value={basicInfo.dueDate}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "dueDate",
                                    event.target.value
                                )
                            }
                        />
                    </div>

                    {/* Minimum score required to pass the assessment. */}
                    <div className={styles.formGroup}>

                        <label>

                            Passing Marks

                        </label>

                        <input
                            type="number"
                            placeholder="40"
                            value={basicInfo.passingMarks}
                            onChange={(event) =>
                                updateBasicInfo(
                                    "passingMarks",
                                    Number(event.target.value)
                                )
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );

}