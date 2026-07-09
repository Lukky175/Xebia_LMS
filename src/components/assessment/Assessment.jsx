/*
==========================================================
Author       : Lakshit Tyagi
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose:
Main component for the Assessment module.

Responsibilities:

• Display assessment Dashboard/metrics.
• Manage searching and filtering.
• Switch between table and grid layouts.
• Coordinate assessment CRUD operations.
• Open and close the Create Assessment wizard.
• Connect presentation components with business logic.
==========================================================

Architecture

Assessment (Container)
        │
        ├── useAssessment()
        │
        ├── AssessmentTable
        │
        ├── CreateAssessmentModal
        │
        ├── AssessmentCharts
        │
        └── RecentActivity

This component coordinates feature-level state
while child components remain presentation-focused.
*/

import { useEffect, useMemo, useState } from "react";
import styles from "./Assessment.module.css";

/*
==========================================================
Custom Hook

Contains all business logic related to assessments.

Instead of directly manipulating state inside this
component, we delegate CRUD operations to the hook.
==========================================================
*/
import useAssessment from "./hooks/useAssessment";
import CreateAssessmentModal from "./components/CreateAssessmentModal";
import AssessmentToolbar from "./components/AssessmentToolbar";
import AssessmentTable from "./components/AssessmentTable";
import AssessmentGrid from "./components/AssessmentGrid";
import AssessmentCharts from "./components/AssessmentCharts";
import RecentActivity from "./components/RecentActivity";


import {
    FiActivity,
    FiEdit3,
} from "react-icons/fi";

import {
    HiOutlineClipboardDocumentList,
    HiOutlineCheckBadge
} from "react-icons/hi2";

export default function Assessment() {

    /* ======================================================
       VIEW STATE

       Determines how assessments are displayed.

       Possible values:
       - table
       - grid
    ====================================================== */
    const [view, setView] = useState("grid");


    /* ======================================================
       MODAL STATE

       Controls visibility of Create Assessment Modal.
    ====================================================== */
    const [showCreateModal, setShowCreateModal] = useState(false);

    /* ======================================================
       ASSESSMENT STATE

       Comes from our custom hook.

       assessments       -> all assessments
       addAssessment     -> create new assessment
       editAssessment    -> update assessment
       removeAssessment  -> delete assessment
    ====================================================== */

    const {

        assessments,
        addAssessment,
        editAssessment,
        removeAssessment
    } = useAssessment();



    /* ======================================================
       SEARCH STATE

       Stores whatever user types in search box.
    ====================================================== */

    const [searchQuery, setSearchQuery] =

        useState("");

    /* ======================================================
       FILTER STATE

       Stores selected assessment status.

       Values

       ALL

       ACTIVE

       DRAFT

       COMPLETED
    ====================================================== */

    const [statusFilter, setStatusFilter] =

        useState("ALL");

    /* ======================================================
       PAGINATION STATE

       Current page being viewed.

       Pagination will be implemented later.
    ====================================================== */

    const [currentPage, setCurrentPage] =

        useState(1);

    /* ======================================================
       FILTERED ASSESSMENTS

       Computes the final list displayed to the user.

        Filtering is memoized to avoid recalculating on
        every render when unrelated state changes.

        Recomputes only when

        • assessments
        • searchQuery
        • statusFilter

        change.
    ====================================================== */

    const filteredAssessments = useMemo(() => {

        let filtered = assessments;

        /*
        ----------------------------------------------
        Status Filter
        ----------------------------------------------
        */

        if (statusFilter !== "ALL") {

            filtered = filtered.filter(

                assessment => assessment.status === statusFilter

            );

        }



        /*
        ----------------------------------------------
        Search Filter

        Searches assessment title.

        Search is case insensitive.
        ----------------------------------------------
        */

        if (searchQuery.trim()) {

            filtered = filtered.filter(
                assessment =>
                    assessment.title
                        .toLowerCase()
                        .includes(
                            searchQuery.toLowerCase()
                        )
            );
        }
        return filtered;
    },

    [
        assessments,
        statusFilter,
        searchQuery
    ]);


    /* ======================================================
       MODAL HANDLERS
    ====================================================== */

    const openCreateModal = () =>
        setShowCreateModal(true);
    const closeCreateModal = () =>
        setShowCreateModal(false);

    /* ======================================================
       Receives the completed assessment draft from the
        Create Assessment modal.

        Business logic is delegated to useAssessment(),
        keeping this component focused on presentation.

        Future Flow

        Modal
            ↓

        handleCreateAssessment()

            ↓

        useAssessment()

            ↓

        assessmentService()

            ↓

        Backend API
    ====================================================== */

    const handleCreateAssessment = (

        assessment

    ) => {

        addAssessment(assessment);

    };



    /*
    ==========================================================
    Component Layout

    1. Header
    2. Metrics
    3. Assessment Listing
    4. Create Assessment Modal
    5. Analytics
    6. Recent Activity
    ==========================================================
    */

    /*
    ==========================================================
    Reset Pagination

    Whenever the search query or selected status
    changes, return the user to the first page.

    Without this, the user may remain on a page
    that no longer exists after filtering.
    ==========================================================
    */

    useEffect(() => {

        setCurrentPage(1);

    }, [

        searchQuery,

        statusFilter

    ]);

    return (

        <section className={styles.container}>

            {/* ==========================================
                Page Header
            ========================================== */}

            <div className={styles.header}>

                <div>

                    <h1 className={styles.title}>

                        Assessment Management

                    </h1>

                    <p className={styles.subtitle}>

                        Create, manage and monitor
                        assessments across organisations.

                    </p>

                </div>


                <button
                    className={styles.createButton}
                    onClick={openCreateModal}
                >
                    + Create Assessment
                </button>
            </div>



            {/*
            ==========================================================
            Dashboard Metrics

            Displays a high-level summary of the current
            assessment dataset.

            These values are computed dynamically from the
            assessment collection.

            Future enhancement

            Metrics can be supplied directly by the backend
            to improve performance on large datasets.
            ==========================================================
            */}

            <div className={styles.metrics}>
                <div className={styles.metricCard}>
                    <div className={styles.metricTop}>
                        <div>
                            <h3>Total Assessments</h3>
                            <span>{assessments.length}</span>
                        </div>

                        <div className={styles.metricIcon}>
                            <HiOutlineClipboardDocumentList size={28} />
                        </div>
                    </div>
                </div>



                <div className={styles.metricCard}>
                    <div className={styles.metricTop}>
                        <div>
                            <h3>Active</h3>
                            <span>
                                {
                                    assessments.filter(
                                        assessment =>
                                            assessment.status==="ACTIVE"
                                    ).length
                                }
                            </span>
                        </div>

                        <div className={`${styles.metricIcon} ${styles.activeIcon}`}>
                            <FiActivity size={25} />
                        </div>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricTop}>
                        <div>
                            <h3>Draft</h3>
                            <span>
                                {
                                    assessments.filter(
                                        assessment =>
                                            assessment.status==="DRAFT"
                                    ).length

                                }

                            </span>

                        </div>

                        <div className={`${styles.metricIcon} ${styles.draftIcon}`}>
                            <FiEdit3 size={28} />
                        </div>

                    </div>

                </div>



                <div className={styles.metricCard}>

                    <div className={styles.metricTop}>

                        <div>

                            <h3>Completed</h3>

                            <span>

                                {

                                    assessments.filter(

                                        assessment =>

                                            assessment.status==="COMPLETED"

                                    ).length

                                }

                            </span>

                        </div>

                        <div className={`${styles.metricIcon} ${styles.completedIcon}`}>
                            <HiOutlineCheckBadge size={28} />
                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================================
                Search / Filters / View Toggle
            ========================================== */}

            {/* ==========================================
                Assessment View

                Displays either

                Table View

                or

                Grid View
            ========================================== */}

            <AssessmentTable
                assessments={filteredAssessments}
                onDelete={removeAssessment}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                view={view}
                setView={setView}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

            {/* ==========================================
                Create Assessment Modal
            ========================================== */}

            <CreateAssessmentModal

                open={showCreateModal}

                onClose={closeCreateModal}

                onCreate={handleCreateAssessment}

            />

            {/* Charts and recent Activity */}
            <AssessmentCharts />
            <RecentActivity/>

        </section>

    );

}