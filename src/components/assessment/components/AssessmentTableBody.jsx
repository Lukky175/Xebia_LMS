/*
==========================================================
Assessment Table Body

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays assessment records inside a tabular layout.

Responsibilities

• Render assessment rows.
• Display assessment metadata.
• Display assessment status.
• Display assessment statistics.
• Display quick action controls.
• Forward user actions to the parent component.

Architecture

Assessment
      │
      ▼
AssessmentTable
      │
      ▼
AssessmentTableBody
      │
      ▼
Individual Assessment Rows

Notes

This component is purely presentational.

It does not own assessment state or perform
CRUD operations.

All user actions are delegated through props.
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./AssessmentTableBody.module.css";

/* ============================
   Icons
============================ */
import {
    FiEdit2,
    FiTrash2,
    FiBarChart2
}
from "react-icons/fi";


/**
 * AssessmentTableBody
 *
 * Renders assessment data inside the table.
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
export default function AssessmentTableBody({
    assessments,
    onDelete
}) {

    /**
     * Maps an assessment status to its
     * corresponding CSS class.
     *
     * Parameters
     * ----------
     * status
     *      Current assessment status.
     *
     * Returns
     * -------
     * string
     *      CSS Module class name used to style
     *      the status badge.
     *
     * Example
     *
     * ACTIVE
     *      ↓
     * styles.active
     */
    const getStatusClass = (status) => {
        switch (status) {
            case "ACTIVE":
                return styles.active;

            case "DRAFT":
                return styles.draft;

            case "COMPLETED":
                return styles.completed;

            default:
                return "";
        }
    };


    /*
    ==========================================================
    Component Layout

    Assessment Table

    • Header
    • Assessment Rows

    Each row displays

    • Basic Information
    • Type
    • Status
    • Attempts
    • Average Score
    • Actions

    ==========================================================
    */
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                {/* ==========================================
                    Table Header

                    Defines the structure of each assessment
                    record displayed in the table.
                ========================================== */}
                <thead>
                    <tr>
                        <th className={styles.assessmentColumn}>
                            Assessment
                        </th>

                        <th className={styles.typeColumn}>
                            Type
                        </th>

                        <th className={styles.statusColumn}>
                            Status
                        </th>

                        <th className={styles.attemptColumn}>
                            Attempts
                        </th>

                        <th className={styles.averageColumn}>
                            Average
                        </th>

                        <th className={styles.actionsColumn}>
                            Actions
                        </th>

                    </tr>
                </thead>


                {/* ==========================================
                    Assessment Rows

                    Render one table row for every assessment
                    received from the parent component.
                ========================================== */}
                <tbody>
                    {
                        assessments.map((assessment) => (
                            <tr key={assessment.id}>
                                {/* ==========================================
                                        Assessment Information

                                        Displays assessment title together with
                                        creation and due date metadata.
                                    ========================================== */}
                                <td className={styles.assessmentColumn}>
                                    <div className={styles.titleCell}>
                                        <span className={styles.title}>
                                            {assessment.title}
                                        </span>

                                        <span className={styles.subtitle}>
                                            Created {assessment.createdAt}
                                            {" • "}
                                            Due {assessment.dueDate}
                                        </span>
                                    </div>
                                </td>

                                {/* Assessment type
                                    (Quiz, Assignment, Coding Test, etc.) */}
                                <td className={styles.typeColumn}>
                                    {assessment.assessmentType}
                                </td>

                                {/* Status badge

                                    Badge color is determined dynamically
                                    based on assessment status. */}
                                <td className={styles.statusColumn}>
                                    <span
                                        className={`${styles.status} ${getStatusClass(
                                            assessment.status
                                        )}`}

                                    >

                                        {assessment.status}
                                    </span>
                                </td>

                                {/* Candidate participation statistics.

                                    Format

                                    Completed / Expected */}
                                <td className={styles.attemptColumn}>
                                    {assessment.submissions}
                                    <span className={styles.separator}>
                                        {" / "}
                                    </span>
                                    {assessment.expectedCandidates}

                                </td>

                                {/* Average learner score for this
                                    assessment. */}
                                <td className={styles.averageColumn}>
                                    {assessment.averageScore}%
                                </td>

                                {/* ==========================================
                                    Assessment Actions

                                    Available Actions

                                    • Edit
                                    • View Analytics
                                    • Delete

                                    Business logic is handled by the parent
                                    component.
                                ========================================== */}

                                <td className={styles.actionsColumn}>
                                    <div className={styles.actions}>
                                        <button className={styles.editButton}>
                                            <FiEdit2/>
                                        </button>

                                        <button className={styles.analyticsButton}>
                                            <FiBarChart2/>
                                        </button>
                                        {/* Delegate delete operation to parent.
                                            This component never modifies data
                                            directly. */}
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() =>
                                                onDelete(
                                                    assessment.id
                                                )
                                            }

                                        >

                                            <FiTrash2/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    );

}