/*
==========================================================
Assessment Method Step

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Represents the second step of the Assessment
Creation Wizard.

Allows users to choose how an assessment
should be created.

Responsibilities

• Display available creation methods.
• Allow only one method to be selected.
• Update the shared assessment draft.
• Indicate unavailable features.

Architecture

CreateAssessmentModal
        │
        ▼
AssessmentMethodStep
        │
        ▼
updateCreationMethod()
        │
        ▼
draftAssessment.creationMethod

Current Methods

✓ Manual Creation

Future Methods

• AI Generation
• PDF Import

Notes

This component does not generate assessments.

It only determines which creation workflow
will be used later in the wizard.

Future Integration

AI Generation

POST /api/assessments/ai

PDF Import

POST /api/assessments/import/pdf

==========================================================
*/


/*
Future Workflow

Manual
    ↓
Question Builder

AI
    ↓
Topic → AI Service → Questions

PDF
    ↓
PDF Parser → Questions

Each workflow eventually produces the same
question structure before reaching the
Review step.
*/


/* ============================
   Styles
============================ */
import styles from "./AssessmentMethodStep.module.css";

/* ============================
   React Hooks
============================ */
import { useEffect } from "react";

/* ============================
   Icons
============================ */
import {
    FiEdit3,
    FiCpu,
    FiUploadCloud,
    FiCheckCircle
}
from "react-icons/fi";


/*
==========================================================
Assessment Creation Methods

Defines every supported assessment creation
workflow.

Each method contains

• Unique identifier
• Display title
• Description
• Icon
• Availability

Adding future creation methods only requires
adding another object to this array.
==========================================================
*/
const methods = [
    {
        id: "manual",
        title: "Create Manually",
        description:
            "Build questions yourself using Xebia's question builder.",
        icon: FiEdit3,
        disabled: false
    },

    {
        id: "ai",
        title: "Generate with AI",
        description:
            "Generate questions automatically using AI from your topic.",
        icon: FiCpu,
        disabled: true
    },

    {
        id: "pdf",
        title: "Upload PDF",
        description:
            "Import an existing question paper and convert it into an assessment.",
        icon: FiUploadCloud,
        disabled: true
    }
];

/**
 * AssessmentMethodStep
 *
 * Allows users to choose how an assessment
 * should be created.
 *
 * Props
 * -----
 * creationMethod
 *      Currently selected workflow.
 *
 * setCreationMethod
 *      Updates the selected workflow.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function AssessmentMethodStep({
    creationMethod,
    setCreationMethod
}){
    /* ==========================================
        Default Selection

        Ensure a valid creation method always
        exists.

        Manual creation is selected by default
        when the wizard is first opened.
        ========================================== */
    useEffect(() => {

        if (!creationMethod) {

            setCreationMethod("manual");

        }

    }, [creationMethod, setCreationMethod]);

    /*
    ==========================================================
    Component Layout

    Section Header

    ↓

    Creation Method Cards

    Each card displays

    • Icon
    • Title
    • Description
    • Availability
    • Selection Status

    ==========================================================
    */
    return(

        <div className={styles.container}>

            {/* ==========================================
                Section Introduction

                Explains the purpose of this step before
                presenting the available creation
                methods.
            ========================================== */}
            <div className={styles.header}>
                <h2>
                    Choose Assessment Creation Method
                </h2>

                <p>
                    Select how you would like to create this assessment.
                </p>

            </div>
            <div className={styles.cards}>
                {
                    /* ==========================================
                        Creation Method Cards

                        Render one selectable card for every
                        supported assessment creation workflow.
                    ========================================== */
                    methods.map(method=>{
                        const Icon=method.icon;
                        /*
                        Determine whether this method is currently
                        selected so the appropriate visual styling
                        can be applied.
                        */
                        const active=
                            creationMethod===method.id;
                        return(
                            /* Individual assessment creation method. */
                            <button
                                key={method.id}
                                type="button"
                                // Prevent selection of features that are yet available.
                                data-disabled={method.disabled}
                                onClick={() => {
                                    if (method.disabled) return;
                                    setCreationMethod(method.id);
                                }}
                                /* Display a confirmation icon when this method is currently selected. */
                                className={`
                                    ${styles.card}
                                    ${active ? styles.active : ""}
                                    ${method.disabled ? styles.disabled : ""}
                                `}
                            >
                                {/* Inform users that this workflow will
    be available in a future release. */}
                                <div className={styles.icon}>
                                    <div className={styles.iconWrapper}>
                                        <Icon size={26}/>
                                    </div>
                                </div>

                                <h3>
                                    {method.title}
                                </h3>

                                <p>
                                    {method.description}
                                </p>

                                {
                                    active &&
                                    <div className={styles.selected}>
                                        <FiCheckCircle/>
                                    </div>
                                }

                                {
                                    method.disabled &&
                                    <span className={styles.badge}>
                                        Coming Soon
                                    </span>
                                }

                            
                                {/* ==========================================
                                    Card Status

                                    Displays the current availability or
                                    selection state of the creation method.
                                ========================================== */}

                                <div className={styles.footer}>
                                    {
                                        active
                                        ?
                                        <span className={styles.selectedText}>
                                            ✓ Selected
                                        </span>
                                        :
                                        method.disabled
                                        ?
                                        <span>
                                            Not Available Yet
                                        </span>
                                        :
                                        <span>
                                            Click to choose
                                        </span>
                                    }
                                </div>
                            </button>
                        );
                    })
                }
            </div>
        </div>
    );
}