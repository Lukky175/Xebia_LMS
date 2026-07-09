/*
==========================================================
Recent Activity

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays the most recent assessment-related
activities in chronological order.

Responsibilities

• Display assessment activity timeline.
• Present recent assessment events.
• Display activity timestamps.
• Keep activity presentation separate from
  assessment management logic.

Architecture

Assessment
      │
      ▼
RecentActivity
      │
      ▼
Activity Data
      │
      ▼
Timeline Cards

Notes

This is a presentation component.

Activity data currently comes from mock data.

Future Integration

Assessment activity can be retrieved from
backend notification or audit APIs.

Example Endpoint

GET /api/assessments/activity
==========================================================
*/

/* ============================
   Assessment Activity Data
============================ */

import {assessmentActivity} from "../../../data/assessments";

/* ============================
   Styles
============================ */
import styles from "./RecentActivity.module.css";

/* ============================
   Icons
============================ */
import { FiClock } from "react-icons/fi";


/**
 * RecentActivity
 *
 * Displays a timeline of recent
 * assessment-related events.
 *
 * Returns
 * -------
 * JSX.Element
 *
 * Notes
 * -----
 * Activity entries are rendered from the
 * assessmentActivity dataset.
 */
export default function RecentActivity(){

    /*
    ==========================================================
    Component Layout

    1. Section Header

    2. Activity Timeline

    Each activity displays

    • Activity Icon
    • Title
    • Timestamp
    • Description

    ==========================================================
    */
    return(
        <div className={styles.card}>
            {/* ==========================================
                Section Header

                Displays the title and description for
                the Recent Activity timeline.
            ========================================== */}
            <div className={styles.header}>
                <div>
                    <h3>
                        Recent Activity
                    </h3>

                    <p>
                        Latest updates from assessments.
                    </p>
                </div>
            </div>

            {/* ==========================================
                Activity Timeline

                Render one timeline item for every
                recorded assessment activity.

                Future

                Activities may be retrieved from
                backend audit logs.
            ========================================== */}
            {
                assessmentActivity.map(
                    activity=>(
                        /* Individual activity entry. */
                        
                        <div
                            key={activity.id}
                            className={styles.item}
                        >
                            {/* Timeline indicator representing an
                                assessment event. */}
                            <div className={styles.dot}>
                                <FiClock/>
                            </div>

                            {/* Activity details including title,
                                timestamp and description. */}
                            <div className={styles.content}>
                                <div className={styles.topRow}>
                                    <h4>
                                        {activity.title}
                                    </h4>
                                    <small>
                                        {activity.time}
                                    </small>
                                </div>
                                <p>
                                    {activity.description}
                                </p>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    );

}