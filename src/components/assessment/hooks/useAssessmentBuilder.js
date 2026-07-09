/*
==========================================================
Assessment Builder Hook

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia

Purpose

Manages the complete Assessment Creation Wizard.

Responsibilities

• Wizard navigation
• Draft assessment state
• Basic information
• Question management
• Creation method selection
• Validation support
• Future API payload preparation

Important

This hook DOES NOT communicate with the backend.

It only prepares a draft object.

The final draft can later be submitted using
assessmentService.createAssessment().

Benefits

• Easy API integration
• Draft autosave support
• Edit assessment support
• Centralized state management
==========================================================
*/

import { useState } from "react";

export default function useAssessmentBuilder() {

    /* ==========================================
       Current Step
    ========================================== */

    const [currentStep, setCurrentStep] =
        useState(1);

    /*
        ==========================================================
        Draft Assessment

        Single source of truth for the entire wizard.

        Every step updates this object instead of maintaining
        its own local copy.

        Future Backend Payload

        POST /assessments

        {
            basicInfo,
            creationMethod,
            questions,
            settings
        }

        Keeping one centralized object makes features such as

        • Editing assessments
        • Autosave
        • Draft recovery
        • API integration

        much easier to implement.
        ==========================================================
    */

    const [draftAssessment, setDraftAssessment] =
        useState({

            basicInfo: {

                title: "",

                description: "",

                thumbnail: null,

                courses: [],

                batches: [],

                universities: [],

                type: "",

                difficulty: "",

                trainer: "",

                dueDate: "",

                duration: "",

                passingMarks: 40,

                visibility: "PRIVATE",

                maxAttempts: 1

            },

            creationMethod: "manual",

            questions: [],

            settings: {

                shuffleQuestions: true,

                shuffleOptions: true,

                negativeMarking: true

            }

        });

    /*
        ==========================================================
        Wizard Navigation

        Controls movement between wizard steps.

        Current Flow

        1 → Basic Information

        2 → Assessment Method

        3 → Question Builder

        4 → Review & Publish

        Navigation is intentionally bounded so users
        cannot move outside the valid step range.
        ==========================================================
    */
    /**
     * Moves the wizard to the next step.
     *
     * Returns
     * -------
     * void
     *
     * Notes
     * -----
     * Maximum allowed step is 4.
     */

    const nextStep = () =>

        setCurrentStep(step =>

            Math.min(step + 1, 4)

        );

    /**
     * Moves the wizard to the previous step.
     *
     * Returns
     * -------
     * void
     *
     * Notes
     * -----
     * Minimum allowed step is 1.
     */

    const previousStep = () =>

        setCurrentStep(step =>

            Math.max(step - 1, 1)

        );

    /**
     * Navigates directly to a specific wizard step.
     *
     * Parameters
     * ----------
     * step
     *      Target wizard step.
     *
     * Returns
     * -------
     * void
     */

    const goToStep = (step) =>

        setCurrentStep(step);

    /**
     * Updates a single property inside the
     * basicInfo section of the draft assessment.
     *
     * Parameters
     * ----------
     * field
     *      Property name to update.
     *
     * value
     *      New property value.
     *
     * Returns
     * -------
     * void
     *
     * Example
     *
     * updateBasicInfo("title", "React Fundamentals")
     */

    const updateBasicInfo = (

        field,

        value

    ) => {

        setDraftAssessment(previous => ({

            ...previous,

            basicInfo: {

                ...previous.basicInfo,

                [field]: value

            }

        }));

    };
    /**
     * Updates the assessment creation strategy.
     *
     * Supported Values
     * ----------------
     * manual
     * ai
     * pdf
     *
     * Parameters
     * ----------
     * method
     *      Selected creation method.
     *
     * Returns
     * -------
     * void
     */

    const updateCreationMethod = (

        method

    ) => {

        setDraftAssessment(previous => ({

            ...previous,

            creationMethod: method

        }));

    };

    /**
     * Creates a new question with default values
     * and appends it to the draft assessment.
     *
     * Default Configuration
     * ---------------------
     * • Single choice question
     * • Two empty options
     * • Positive marks = 4
     * • Negative marks = -1
     *
     * Returns
     * -------
     * void
     *
     * Future
     * ------
     * Default values can later be fetched from
     * backend configuration if required.
     */

    const addQuestion = () => {

        const newQuestion = {

            id: Date.now(),

            question: "",

            isMandatory: false,

            questionType: "single",

            image: null,

            options: [

                {
                    id: Date.now() + 1,
                    text: "",
                    image: null
                },

                {
                    id: Date.now() + 2,
                    text: "",
                    image: null
                }

            ],

            correctAnswers: [],

            positiveMarks: 4,

            negativeMarks: -1,

            explanation: ""

        };

        setDraftAssessment(previous => ({

            ...previous,

            questions: [

                ...previous.questions,

                newQuestion

            ]

        }));

    };

    /**
     * Replaces one existing question while
     * preserving every other question.
     *
     * Parameters
     * ----------
     * updatedQuestion
     *      Complete updated question object.
     *
     * Returns
     * -------
     * void
     */

    const updateQuestion = (

        updatedQuestion

    ) => {

        setDraftAssessment(previous => ({

            ...previous,

            questions:

                previous.questions.map(

                    question =>

                        question.id === updatedQuestion.id

                            ? updatedQuestion

                            : question

                )

        }));

    };
    /**
     * Removes a question from the draft assessment.
     *
     * Parameters
     * ----------
     * questionId
     *      Unique identifier of the question.
     *
     * Returns
     * -------
     * void
     */

    const removeQuestion = (

        questionId

    ) => {

        setDraftAssessment(previous => ({

            ...previous,

            questions:

                previous.questions.filter(

                    question =>

                        question.id !== questionId

                )

        }));

    };
    /*
    ==========================================================
    Public Hook API

    Expose only the data and actions required by UI
    components.

    Components remain unaware of the internal state
    structure managed by this hook.
    ==========================================================
    */

    return {

        currentStep,

        nextStep,

        previousStep,

        goToStep,

        draftAssessment,

        updateBasicInfo,

        updateCreationMethod,

        addQuestion,

        updateQuestion,

        removeQuestion

    };

}