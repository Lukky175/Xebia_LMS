/*
==========================================================
Question Navigator

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays the list of assessment questions
and allows users to navigate between them.

Responsibilities

• Display all assessment questions.
• Highlight the active question.
• Navigate between questions.
• Create new questions.
• Display question metadata.

Architecture

QuestionBuilderStep
        │
        ▼
QuestionNavigator
        │
        ▼
selectedQuestion
        │
        ▼
QuestionCard

Notes

This component does not edit questions.

Its only responsibility is navigation.

Future Enhancements

• Validation Status
• Error Indicators
• Drag & Drop Reordering
• Duplicate Question
• Delete Question
• Search Questions
• Collapse Completed Questions
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./QuestionNavigator.module.css";

/* ============================
   Icons
============================ */
import { FiPlus } from "react-icons/fi";

/**
 * QuestionNavigator
 *
 * Displays all assessment questions and
 * controls question navigation.
 *
 * Props
 * -----
 * questions
 *      Complete list of questions.
 *
 * selectedQuestion
 *      Index of the active question.
 *
 * setSelectedQuestion
 *      Updates the active question.
 *
 * addQuestion
 *      Creates a new question.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function QuestionNavigator({

    questions,

    selectedQuestion,

    setSelectedQuestion,

    addQuestion

}){
    /*
    ==========================================================
    Component Layout

    Header
    ↓
    Question List
    ↓
    Add Question Button
    ==========================================================
    */
    return(
        /* ==========================================
            Question Navigation Panel

            Provides quick navigation between all
            questions in the assessment.
        ========================================== */
        <aside className={styles.sidebar}>
            {/* ==========================================
                Navigation Header

                Displays the total number of questions
                currently available.
            ========================================== */}
            <div className={styles.header}>

                <h3>

                    Questions ({questions.length})

                </h3>

            </div>
            {/* ==========================================
                Question List

                Render every question as a selectable
                navigation item.
            ========================================== */}
            <div className={styles.list}>
                {
                    questions.map((question, index) => {

                        const isSelected =
                            selectedQuestion === index;

                        return (

                            <button
                                key={question.id}
                                type="button"
                                onClick={() =>
                                    setSelectedQuestion(index)
                                }
                                className={`
                                    ${styles.item}
                                    ${isSelected ? styles.active : ""}
                                `}
                            >

                                {/* Display question number together with
                                    its current question type. */}

                                <div>

                                    <strong>
                                        Q{index + 1}
                                    </strong>

                                    <small>
                                        {question.questionType}
                                    </small>

                                </div>

                            </button>

                        );

                    })
                }
            </div>
            {/* ==========================================
                    Add Question

                    Creates a new question and delegates
                    selection to QuestionBuilderStep.
                ========================================== */}
            <button
                className={styles.addButton}
                onClick={addQuestion}
            >
                <FiPlus/>
                Add Question
            </button>
        </aside>
    );
}