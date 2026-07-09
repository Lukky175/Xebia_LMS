/*
==========================================================
Assessment Charts

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays visual analytics for assessments using charts.

Responsibilities

• Display assessment attempt statistics.
• Display assessment score trends.
• Convert assessment analytics into visual insights.
• Keep chart rendering separate from dashboard logic.

Architecture

Assessment
      │
      ▼
AssessmentCharts
      │
      ▼
Mock Analytics Data
      │
      ▼
Recharts Components

Future Integration

Analytics data will be retrieved from backend APIs
instead of local mock data.

Possible Endpoint

GET /api/analytics/assessments
==========================================================
*/

/* ============================
   Recharts Components
============================ */
import {

    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Legend,
    LineChart,
    Line

} from "recharts";

/* ============================
   Analytics Data
============================ */

import {

    assessmentAttemptsGraph,

    assessmentScoreGraph

} from "../../../data/assessments";

/* ============================
   Styles
============================ */

import styles from "./AssessmentCharts.module.css";

/**
 * AssessmentCharts
 *
 * Displays assessment analytics using Recharts.
 *
 * Current Charts
 * --------------
 * • Expected vs Completed Attempts
 * • Average Score Trend
 *
 * Returns
 * -------
 * JSX.Element
 *
 * Notes
 * -----
 * Currently uses mock analytics data.
 * Backend analytics endpoints will replace
 * these datasets in the future.
 */

export default function AssessmentCharts() {
    /*
    ==========================================================
    Component Layout

    1. Analytics Header

    2. Attempt Comparison Chart

    3. Score Trend Chart

    ==========================================================
    */

    return (

        /* ==========================================
            Analytics Section Header

            Displays title and description for the
            Assessment Analytics dashboard.
        ========================================== */

        <section className={styles.analyticsSection}>

            <div className={styles.sectionHeader}>

                <div>

                    <h2>
                        Assessment Analytics
                    </h2>

                    <p>
                        Performance insights across all assessments.
                    </p>

                </div>

            </div>

        <div className={styles.container}>
            {/* ==========================================
                Analytics Charts

                Two independent charts are displayed:

                1. Attempt Comparison
                2. Average Score Trend

                Additional charts can easily be added
                without affecting existing components.
            ========================================== */}

            <div className={styles.chartCard}>
                {/* ==========================================
                    Attempt Comparison Chart

                    Compares the number of expected learner
                    attempts with completed attempts over time.

                    Future API

                    GET /analytics/assessment-attempts
                ========================================== */}

                <h3>

                    Expected vs Completed Attempts

                </h3>
                {/* Automatically resizes chart based on
                    available container width. */}
                <ResponsiveContainer

                    width="100%"

                    height={340}

                >
                    {/* Renders grouped bar chart using
                        monthly assessment attempt statistics. */}
                    <BarChart

                        data={assessmentAttemptsGraph}

                    >

                        <CartesianGrid

                            vertical={false}

                            stroke="#EEF1F5"

                            strokeDasharray="4 4"

                        />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Legend />


                        {/* Expected learner attempts */}
                        <Bar
                            animationDuration={1300}
                            animationBegin={150}
                            animationEasing="ease-out"
                            dataKey="expected"
                            fill="#6C1D5F"
                            radius={[2, 2, 0, 0]}
                        />

                        {/* Actual completed learner attempts */}
                        <Bar
                            animationDuration={1300}
                            animationBegin={350}
                            animationEasing="ease-out"
                            dataKey="completed"
                            fill="#B168D4"
                            radius={[2, 2, 0, 0]}
                        />



                    </BarChart>

                </ResponsiveContainer>

            </div>


            {/* ==========================================
                Average Score Trend

                Displays expected score trend alongside
                actual learner performance.

                Future API

                GET /analytics/assessment-scores
            ========================================== */}
            <div className={styles.chartCard}>

                <h3>

                    Average Score Trend

                </h3>

                <ResponsiveContainer

                    width="100%"

                    height={340}

                >
                    {/* Monthly assessment score analytics */}
                    <LineChart

                        data={assessmentScoreGraph}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>


                        {/* Target / expected score trend */}
                        <Line

                            animationDuration={1400}

                            animationEasing="ease"

                            dot={false}

                            activeDot={{ r:7 }}

                            stroke="#6C1D5F"

                            strokeWidth={3}

                            dataKey="expected"

                        />


                        {/* Actual average learner score */}
                        <Line

                            animationDuration={1700}

                            animationEasing="ease"

                            dot={false}

                            activeDot={{ r:7 }}

                            stroke="#26A269"

                            strokeWidth={3}

                            dataKey="average"

                        />



                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    </section>
    );

}