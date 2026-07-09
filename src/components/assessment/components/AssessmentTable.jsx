/*
==========================================================
Assessment Table

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Acts as the main layout component for displaying
assessment listings.

Responsibilities

• Display assessment toolbar.
• Switch between table and grid views.
• Manage client-side pagination.
• Pass filtered assessment data to child components.
• Coordinate assessment listing UI.

Architecture

Assessment
      │
      ▼
AssessmentTable
      │
      ├── AssessmentToolbar
      ├── AssessmentTableBody
      ├── AssessmentGrid
      └── AssessmentPagination

Notes

This component does not perform CRUD operations.

It receives data and callbacks from the parent
Assessment component and delegates rendering to
specialized child components.
==========================================================
*/


/* ============================
   React Hooks
============================ */

import { useMemo } from "react";

/* ============================
   Styles
============================ */
import styles from "./AssessmentTable.module.css";

/* ============================
   Child Components
============================ */
import AssessmentToolbar from "./AssessmentToolbar";
import AssessmentTableBody from "./AssessmentTableBody";
import AssessmentPagination from "./AssessmentPagination";
import AssessmentGrid from "./AssessmentGrid";


/**
 * AssessmentTable
 *
 * Coordinates assessment listing components.
 *
 * Props
 * -----
 * assessments
 *      Filtered assessment collection.
 *
 * onDelete
 *      Callback for deleting assessments.
 *
 * searchQuery
 *      Current search text.
 *
 * setSearchQuery
 *      Updates search text.
 *
 * statusFilter
 *      Selected assessment status.
 *
 * setStatusFilter
 *      Updates selected status.
 *
 * view
 *      Active display mode ("table" | "grid").
 *
 * setView
 *      Updates display mode.
 *
 * currentPage
 *      Currently selected page.
 *
 * setCurrentPage
 *      Updates current page.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function AssessmentTable({

    assessments,

    onDelete,

    searchQuery,
    setSearchQuery,

    statusFilter,
    setStatusFilter,

    view,
    setView,

    currentPage,
    setCurrentPage

}) {

    /*
    ==========================================================
    Client-side Pagination

    Assessment data is paginated before being passed
    to child components.

    Future

    When server-side pagination is introduced, this
    logic can be replaced with API requests while the
    UI remains unchanged.
    ==========================================================
    */

    // Number of assessments displayed on each page.
    const ITEMS_PER_PAGE = 6;

    // Ensure at least one page exists, even when
    // there are no assessments.
    const totalPages = Math.max(
        1,Math.ceil(
            assessments.length / ITEMS_PER_PAGE
        )
    );

    /*
    Returns only the assessments that belong to the
    currently selected page.

    useMemo prevents unnecessary recalculation when
    unrelated component state changes.
    */
    const currentAssessments = useMemo(() => {
        const startIndex =
            (currentPage - 1) * ITEMS_PER_PAGE;
        return assessments.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );
    },
    [
        assessments,
        currentPage
    ]);

    /*
    ==========================================================
    Component Layout

    1. Section Title

    2. Toolbar

    3. Assessment Listing
    • Table View
    • Grid View

    4. Pagination

    ==========================================================
    */

    /*
    ==========================================================
    Current Assessment View

    Selects which presentation component should
    render the assessment list.

    Both views receive the same props, allowing
    users to switch layouts without changing the
    underlying business logic.
    ==========================================================
    */

    const AssessmentView =

        view === "table"

            ? AssessmentTableBody
            : AssessmentGrid;
    return (

        <section className={styles.card}>

            {/* ==========================================
                Section Title

                Displays the heading for the assessment
                listing section.
            ========================================== */}
            <div className={styles.title}>
                <h2>
                     Recent Assessments
                </h2>
            </div>

            {/* ==========================================
                Assessment Toolbar

                Provides

                • Search
                • Status filtering
                • View switching
            ========================================== */}
            <AssessmentToolbar

                title="Recent Assessments"

                searchQuery={searchQuery}

                setSearchQuery={setSearchQuery}

                statusFilter={statusFilter}

                setStatusFilter={setStatusFilter}

                view={view}

                setView={setView}

            />

            {/* ==========================================
                Assessment Listing

                Render the selected presentation mode.

                Table View
                    or
                Grid View

                Both components receive identical data,
                making the layout interchangeable without
                changing business logic.
            ========================================== */}

            <AssessmentView

                assessments={currentAssessments}

                onDelete={onDelete}

            />

            {/* ==========================================
                Pagination

                Displays page navigation controls and
                record information.

                Changing pages only updates the visible
                assessment subset.
            ========================================== */}

            <AssessmentPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={assessments.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
            />

        </section>

    );

}