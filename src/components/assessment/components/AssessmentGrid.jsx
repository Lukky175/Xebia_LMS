/*
==========================================================
Assessment Grid

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays assessments in a responsive card-based grid.

Responsibilities

• Render assessment summary cards.
• Display assessment metadata.
• Display assessment statistics.
• Provide quick assessment actions.
• Forward user actions to parent components.

Architecture

Assessment
      │
      ▼
AssessmentGrid
      │
      ├── Assessment Cards
      ├── Statistics
      ├── Trainer Information
      └── Action Buttons

Notes

This is a presentation component.

It does not manage assessment state or perform
CRUD operations directly.

All actions are delegated to the parent component
through callback props.
==========================================================
*/

/* ============================
   Styles
============================ */

import styles from "./AssessmentGrid.module.css";

/* ============================
   Icons
============================ */
import {
    FiEdit2,
    FiTrash2,
    FiBarChart2,
} from "react-icons/fi";

/**
 * AssessmentGrid
 *
 * Displays assessments in a card layout.
 *
 * Props
 * -----
 * assessments
 *      Array of assessment objects.
 *
 * onDelete
 *      Callback invoked when an assessment
 *      should be deleted.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function AssessmentGrid({
        assessments,
        onDelete
    }) {
        /*
        ==========================================================
        Component Layout

        Each assessment card contains

        • Banner
        • Status
        • Basic Information
        • Assessment Metadata
        • Statistics
        • Trainer Details
        • Quick Actions

        ==========================================================
        */
    return (

        <div className={styles.grid}>
            {
                /* ==========================================
                    Render one card for every assessment.

                    React uses the assessment ID as the key
                    to efficiently update only changed cards.
                ========================================== */
                assessments.map((assessment) => (
                    <article
                        key={assessment.id}
                        className={styles.card}
                    >

                    {/* ==========================================
                        Assessment Banner

                        Displays the assessment thumbnail together
                        with its current lifecycle status.

                        Future

                        Banner images may eventually be served
                        from cloud storage or a CDN.
                    ========================================== */}

                        <div
                            className={styles.banner}
                            style={{

                                backgroundImage:`url(${assessment.thumbnail})`

                            }}

                        >
                            {/* Dynamic status badge.

                                CSS class is selected based on the
                                assessment status.

                                Example

                                ACTIVE
                                    ↓
                                styles.active
                            */}
                            <span
                                className={`${styles.status} ${styles[assessment.status.toLowerCase()]}`}
                            >
                                {assessment.status}
                            </span>

                        </div>

                        {/* ==========================================
                            Assessment Details

                            Displays the primary information required
                            to identify and understand the assessment.
                        ========================================== */}

                        <div className={styles.content}>

                            <h3>
                                {assessment.title}

                            </h3>

                            {/* Prevent long descriptions from increasing
                                card height and affecting the grid layout. */}
                            <p>

                                {assessment.description.length > 80

                                    ? assessment.description.slice(0,80)+"..."
                                    : assessment.description}

                            </p>

                            {/* Quick metadata tags describing the
                                assessment configuration. */}
                            <div className={styles.badges}>
                                <span>
                                    {assessment.assessmentType}
                                </span>

                                <span>
                                    {assessment.difficulty}
                                </span>

                                <span>
                                    {assessment.duration} mins
                                </span>
                            </div>

                            {/* ==========================================
                                Assessment Statistics

                                Displays high-level performance metrics.

                                Future

                                These values can be retrieved from
                                analytics APIs instead of mock data.
                            ========================================== */}

                            <div className={styles.statistics}>
                                <div>
                                    <p>Students</p>

                                    <strong>
                                        {assessment.submissions}/
                                        {assessment.expectedCandidates}
                                    </strong>
                                </div>

                                <div>
                                    <p>Questions</p>

                                    <strong>
                                        {assessment.totalQuestions}
                                    </strong>
                                </div>

                                <div>
                                    <p>Average</p>
                                    <strong>
                                        {assessment.averageScore}%
                                    </strong>
                                </div>
                            </div>

                            {/* ==========================================
                                Card Footer

                                Displays trainer information together
                                with quick management actions.
                            ========================================== */}

                            <div className={styles.footer}>

                                <div>
                                    <small>
                                        Trainer:-
                                    </small>

                                    <strong>
                                        {assessment.trainer.name}
                                    </strong>

                                </div>

                                {/* Quick actions for managing an assessment.

                                    Edit
                                    Analytics
                                    Delete
                                */}
                                <div className={styles.actions}>

                                    <button>
                                        <FiEdit2/>
                                    </button>

                                    <button>
                                        <FiBarChart2/>
                                    </button>

                                {/* Delegate deletion to parent component.

                                    This component never mutates state
                                    directly. */}
                                    <button
                                        onClick={()=>
                                            onDelete(
                                                assessment.id
                                            )
                                        }

                                    >

                                        <FiTrash2/>

                                    </button>
                                </div>
                            </div>
                        </div>

                    </article>
                ))
            }
        </div>
    );

}