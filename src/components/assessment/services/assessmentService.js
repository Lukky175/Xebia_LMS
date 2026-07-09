/*
==========================================================
Assessment Service

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Acts as the single source of truth for all Assessment
data operations.

Responsibilities

• Retrieve assessments.
• Create new assessments.
• Update existing assessments.
• Delete assessments.
• Abstract data access from UI components.

Architecture

UI Components
        │
        ▼
useAssessment Hook
        │
        ▼
assessmentService
        │
        ▼
Mock Data / Backend API

Notes

Currently this service operates on local mock data.

When backend APIs become available, only this file
should be modified. Components and hooks should not
require any changes.

Future API Endpoints

GET    /api/assessments
POST   /api/assessments
PUT    /api/assessments/:id
DELETE /api/assessments/:id
==========================================================
*/

/* ============================
   Mock Assessment Data
============================ */

import { initialAssessments } from "../../../data/assessments";

/*
----------------------------------------------------------
In-Memory Assessment Store

Acts as a temporary database while backend APIs
are under development.

This will eventually be replaced with API calls.
----------------------------------------------------------
*/
let assessments = [...initialAssessments];

/**
 * Retrieves all available assessments.
 *
 * Parameters
 * ----------
 * None
 *
 * Returns
 * -------
 * Array
 *      A new copy of the assessment list.
 *
 * Notes
 * -----
 * Returning a copy prevents external code from
 * accidentally mutating the internal store.
 */
export const getAssessments = () => {
    return [...assessments];
};

/* ==========================================
   Draft Assessment Mapper

   Converts the Assessment Creation Wizard
   draft into the assessment model expected
   by the dashboard.

   Future

   When the backend is integrated this mapper
   can be removed because the API will return
   the final assessment object directly.
========================================== */

const mapDraftToAssessment = (draft) => {

    return {

        id: Date.now(),

        title: draft.basicInfo.title,

        description: draft.basicInfo.description,

        thumbnail:

            draft.basicInfo.thumbnail?.preview ||

            null,

        assessmentType:

            draft.basicInfo.type,

        difficulty:

            draft.basicInfo.difficulty,

        duration:

            Number(draft.basicInfo.duration),

        trainer: {

            name:

                draft.basicInfo.trainer

        },

        dueDate:

            draft.basicInfo.dueDate,

        totalQuestions:

            draft.questions.length,

        status: "DRAFT",

        submissions: 0,

        expectedCandidates: 0,

        averageScore: 0,

        createdAt:

            new Date().toLocaleDateString()

    };

};

/**
 * Creates a new assessment.
 *
 * Parameters
 * ----------
 * assessment
 *      Assessment object provided by the UI.
 *
 * Returns
 * -------
 * Object
 *      Newly created assessment including its ID.
 *
 * Future API
 * ----------
 * POST /api/assessments
 */
export const createAssessment = (draftAssessment) => {

    const newAssessment =

        mapDraftToAssessment(

            draftAssessment

        );

    assessments.unshift(

        newAssessment

    );

    return newAssessment;

};

/**
 * Updates an existing assessment.
 *
 * Parameters
 * ----------
 * updatedAssessment
 *      Complete assessment object containing
 *      the latest values.
 *
 * Returns
 * -------
 * void
 *
 * Future API
 * ----------
 * PUT /api/assessments/:id
 */
export const updateAssessment = (updatedAssessment) => {

    assessments = assessments.map((assessment) =>

        assessment.id === updatedAssessment.id
            ? updatedAssessment
            : assessment

    );

};

/**
 * Deletes an assessment.
 *
 * Parameters
 * ----------
 * id
 *      Unique assessment identifier.
 *
 * Returns
 * -------
 * void
 *
 * Future API
 * ----------
 * DELETE /api/assessments/:id
 */
export const deleteAssessment = (id) => {

    assessments = assessments.filter(

        assessment => assessment.id !== id

    );

};