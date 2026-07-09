/*
==========================================================
Assessment Toolbar

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Provides search and view controls for the
Assessment listing.

Responsibilities

• Search assessments.
• Switch between table and grid layouts.
• Provide placeholders for filtering.
• Provide placeholders for exporting data.
• Forward user interactions to the parent component.

Architecture

Assessment
      │
      ▼
AssessmentTable
      │
      ▼
AssessmentToolbar
      │
      ▼
Parent State Updates

Notes

This component does not own assessment data.

Search text and view mode are controlled by
the parent component using React state.

Future Features

• Advanced filters
• Export to CSV / Excel
• Sorting controls
• Bulk actions
==========================================================
*/

/* Future Enhancements (Priority)

Make the Filter and Export button working
For Filter expand the area below to show field like Assessment(with a searchbar to enter name), Type, Status, etc.
*/

/* ============================
   Styles
============================ */
import styles from "./AssessmentToolbar.module.css";


/* ============================
   Icons
============================ */
import { CiFilter } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";

import {
    HiOutlineViewGrid,
    HiOutlineViewList
} from "react-icons/hi";


/**
 * AssessmentToolbar
 *
 * Displays controls for managing the
 * assessment listing.
 *
 * Props
 * -----
 * searchQuery
 *      Current search text.
 *
 * setSearchQuery
 *      Updates the search text.
 *
 * view
 *      Current display mode.
 *
 * setView
 *      Updates the selected display mode.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function AssessmentToolbar({

    searchQuery,
    setSearchQuery,

    view,
    setView

}) {

    /*
    ==========================================================
    Component Layout

    1. Search Input

    2. Toolbar Actions
    • Filter
    • Export

    3. View Switch
    • Grid View
    • Table View

    ==========================================================
    */
    return (

        <div className={styles.toolbar}>

            {/* ==========================================
                Assessment Search

                Filters assessments by title as the
                user types.

                Future

                Can be replaced with server-side search
                when backend APIs are available.
            ========================================== */}

            <div className={styles.searchContainer}>

                {/* Controlled input.

                    Search state is managed by the parent
                    component to keep filtering logic
                    centralized. */}
                <input
                    type="text"
                    placeholder="Search assessments..."
                    value={searchQuery}
                    onChange={(e) =>
                        setSearchQuery(e.target.value)
                    }
                    className={styles.search}
                />

            </div>



            {/* ==========================================
                Toolbar Actions

                Contains utility actions and view controls.

                Current

                • Filter (placeholder)
                • Export (placeholder)
                • View Switch

            ========================================== */}

            <div className={styles.rightSection}>

            {/* Future enhancement

                Opens advanced assessment filters. */}
            <button className={styles.iconButton}>
                <CiFilter size={20}/>
                <span>Filter</span>
            </button>

            {/* Future enhancement

                Export assessment data to CSV, Excel
                or PDF. */}
            <button className={styles.iconButton}>
                <MdOutlineFileDownload size={20}/>
                <span>Export</span>
            </button>

            {/* Toggle between table and grid layouts.

                Active view is controlled by the parent
                component. */}
            <div className={styles.viewSwitch}>

                {/* Display assessments using card layout. */}
                <button
                    className={
                        view === "grid"
                            ? styles.activeView
                            : ""
                    }
                    onClick={() => setView("grid")}
                >
                    <HiOutlineViewGrid />
                </button>

                {/* Display assessments using table layout. */}
                <button
                    className={
                        view === "table"
                            ? styles.activeView
                            : ""
                    }
                    onClick={() => setView("table")}
                >
                    <HiOutlineViewList />
                </button>

            </div>

        </div>

        </div>

    );

}