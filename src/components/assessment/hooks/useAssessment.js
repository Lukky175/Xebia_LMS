/*
==========================================================
Assessment Hook

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia

Purpose

Acts as the communication layer between UI components
and the Assessment Service.

Responsibilities

• Loads assessments.
• Creates new assessments.
• Updates existing assessments.
• Deletes assessments.
• Keeps UI synchronized with the latest data.

Notes

UI components should never directly communicate with
the service layer.

When backend APIs are integrated, only the service
layer should change. Components using this hook
should remain unchanged.
==========================================================
*/

/* ============================
   React Hooks
============================ */

import { useState } from "react";

/* ============================
   Assessment Service
============================ */

import {

    getAssessments,

    createAssessment,

    updateAssessment,

    deleteAssessment

} from "../services/assessmentService";

/**
 * useAssessment
 *
 * Custom hook responsible for exposing assessment
 * CRUD operations to UI components.
 *
 * Returns
 * -------
 * assessments
 *      Current assessment list.
 *
 * addAssessment()
 *      Creates a new assessment.
 *
 * editAssessment()
 *      Updates an existing assessment.
 *
 * removeAssessment()
 *      Deletes an assessment.
 */
export default function useAssessment() {

    /*
    ------------------------------------------------------
    Assessment State

    Stores the latest assessment list.

    Future API Flow

    GET /assessments

    After every successful mutation, this state is
    refreshed to keep the UI synchronized.
    ------------------------------------------------------
    */

    const [assessments, setAssessments] =
        useState(getAssessments());

    /**
     * Creates a new assessment.
     *
     * Parameters
     * ----------
     * assessment
     *      Assessment object to be created.
     *
     * Returns
     * -------
     * Object
     *      Newly created assessment.
     */
    const addAssessment = (assessment) => {

        const created = createAssessment(assessment);

        // Refresh local state after successful creation.
        setAssessments(getAssessments());

        return created;

    };

    /**
     * Updates an existing assessment.
     *
     * Parameters
     * ----------
     * assessment
     *      Updated assessment object.
     *
     * Returns
     * -------
     * void
     */
    const editAssessment = (assessment) => {

        updateAssessment(assessment);

        // Reload latest assessment list.
        setAssessments(getAssessments());

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
     */
    const removeAssessment = (id) => {

        deleteAssessment(id);

        // Synchronize UI with latest data.
        setAssessments(getAssessments());

    };

    /*
    Public API exposed to UI components.
    */
    return {

        assessments,

        addAssessment,

        editAssessment,

        removeAssessment

    };

}