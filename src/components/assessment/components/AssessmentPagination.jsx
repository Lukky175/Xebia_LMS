/*
==========================================================
Assessment Pagination

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Reusable pagination component for navigating
large assessment datasets.

Responsibilities

• Display the current record range.
• Render page navigation controls.
• Allow direct page selection.
• Notify parent components when the page changes.

Architecture

AssessmentTable
        │
        ▼
AssessmentPagination
        │
        ▼
onPageChange()
        │
        ▼
Parent Component updates data

Future Integration

Currently pagination operates on local data.

When backend pagination is introduced, this
component can remain unchanged. Only the parent
component will fetch data for the selected page.

Example API

GET /api/assessments?page=2&limit=10
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./AssessmentPagination.module.css";


/* ============================
   Icons
============================ */
import {

    FiChevronLeft,
    FiChevronRight

} from "react-icons/fi";


/**
 * AssessmentPagination
 *
 * Displays pagination controls and record
 * information for assessment listings.
 *
 * Props
 * -----
 * currentPage
 *      Currently selected page.
 *
 * totalPages
 *      Total number of available pages.
 *
 * totalItems
 *      Total assessment count.
 *
 * itemsPerPage
 *      Number of records displayed per page.
 *
 * onPageChange
 *      Callback fired whenever the user
 *      selects another page.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function AssessmentPagination({

    currentPage,

    totalPages,

    totalItems,

    itemsPerPage,

    onPageChange

}) {

    /*
    ==========================================================
    Record Range Calculation

    Determines which assessment numbers are currently
    visible.

    Example

    Page 2

    Items Per Page = 10

    Result

    Showing 11–20
    ==========================================================
    */

    // First visible assessment number on the current page.
    const startItem =

        totalItems === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1;

    // Last visible assessment number.
    // Never exceeds the total number of assessments.
    const endItem =

        Math.min(

            currentPage * itemsPerPage,

            totalItems

        );

        /*
        ==========================================================
        Component Layout

        1. Record Information

        2. Previous Button

        3. Page Numbers

        4. Next Button

        ==========================================================
        */
    return (

        <div className={styles.pagination}>

            {/* ==========================================
                Record Information

                Displays the range of assessments currently
                visible to the user.

                Example

                Showing 21–30 of 152 assessments
            ========================================== */}

            <p className={styles.info}>

                Showing

                <strong>

                    {" "}
                    {startItem}-{endItem}
                    {" "}

                </strong>

                of

                <strong>

                    {" "}
                    {totalItems}
                    {" "}

                </strong>

                assessments

            </p>

            {/* ==========================================
                Pagination Controls

                Allows users to

                • Move to previous page
                • Jump directly to a page
                • Move to next page

            ========================================== */}


            {/* Navigate to the previous page.

                Disabled when already on page one. */}
            <div className={styles.controls}>

                <button
                    className={styles.arrowButton}
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange(
                            currentPage - 1
                        )
                    }

                >

                    <FiChevronLeft />

                </button>

            {/* Render one page button for every available page. */}
                {
                    [...Array(totalPages)].map(
                        (_, index) => (
                            <button
                                key={index}
                                className={
                                    
                                    currentPage === index + 1
                                        ?styles.activePage
                                        :styles.pageButton
                                }

                                onClick={() =>
                                    onPageChange(
                                        index + 1
                                    )
                                }
                            /* Highlight the currently selected page
                                using a dedicated active style. */

                                
                            /* Navigate to the next page.
                                Disabled when the last page is reached. */
                            >

                                {index + 1}

                            </button>

                        )

                    )

                }



                <button

                    className={styles.arrowButton}

                    disabled={

                        currentPage === totalPages

                    }

                    onClick={() =>

                        onPageChange(

                            currentPage + 1

                        )

                    }

                >

                    <FiChevronRight />

                </button>

            </div>

        </div>

    );

}