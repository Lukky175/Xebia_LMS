/*
==========================================================
Question Builder Step

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Represents the third step of the Assessment
Creation Wizard.

Provides the interface for creating,
editing and managing assessment questions.

Responsibilities

• Display all assessment questions.
• Navigate between questions.
• Add new questions.
• Update existing questions.
• Remove questions.
• Render the active QuestionCard.

Architecture

CreateAssessmentModal
        │
        ▼
QuestionBuilderStep
        │
        ├───────────────┐
        ▼               ▼
QuestionNavigator   QuestionCard
        │               │
        └───────┬───────┘
                ▼
draftAssessment.questions

Notes

This component does not directly modify
questions.

All updates are delegated to
useAssessmentBuilder().

Future Enhancements

• Drag & Drop Reordering
• Duplicate Question
• Import Questions
• Question Templates
• Bulk Operations
==========================================================
*/


/* ============================
   Styles
============================ */
import styles from "./QuestionBuilderStep.module.css";

/* ============================
   React Hooks
============================ */
import { useState } from "react";

/* ============================
   Child Components
============================ */
import QuestionCard from "./QuestionCard";
import QuestionNavigator from "./QuestionNavigator";


/**
 * QuestionBuilderStep
 *
 * Displays and manages all assessment
 * questions.
 *
 * Props
 * -----
 * questions
 *      Complete list of assessment questions.
 *
 * addQuestion
 *      Creates a new question.
 *
 * updateQuestion
 *      Updates an existing question.
 *
 * removeQuestion
 *      Removes a question.
 *
 * Returns
 * -------
 * JSX.Element
 */
/*==========================================================================*/
/*
Question Flow

QuestionNavigator
        │
        ▼
selectedQuestion
        │
        ▼
QuestionCard
        │
        ▼
updateQuestion()
        │
        ▼
draftAssessment.questions

This component coordinates navigation while
the hook owns all question state.
*/
export default function QuestionBuilderStep({

    questions,

    addQuestion,

    updateQuestion,

    removeQuestion

}){
    /* ==========================================
   Selected Question

   Stores the index of the question currently
   being edited.

   Only one QuestionCard is displayed at a
   time.
========================================== */
    const [selectedQuestion, setSelectedQuestion] =

    useState(0);

    /*
    ==========================================================
    Component Layout

    Header
    ↓
    Question Navigator
    ↓
    Question Editor

    ==========================================================
    */
    return (
        <div className={styles.container}>
        {/* ==========================================
            Section Header

            Introduces the question builder and
            explains its purpose.
        ========================================== */}
            <div className={styles.header}>

                <div>
                    <h2>
                        Question Builder
                    </h2>

                    <p>
                        Create assessment questions.
                    </p>
                </div>
            </div>

            {/* ==========================================
                Builder Layout

                Left

                Question Navigation

                Right

                Question Editor
            ========================================== */}
            <div className={styles.builder}>
                {/* Sidebar displaying all questions and
                    allowing navigation between them. */}
                <QuestionNavigator
                    questions={questions}
                    selectedQuestion={selectedQuestion}
                    setSelectedQuestion={setSelectedQuestion}
                    /*
                    Create a new question and automatically
                    navigate to it once React has completed
                    the state update.

                    requestAnimationFrame ensures the UI
                    updates before changing the selected
                    question.
                    */
                    addQuestion={() => {
                        addQuestion();
                        {/* Active question editor.

                            Only the currently selected question
                            is rendered to keep the interface
                            focused and responsive. */}
                        requestAnimationFrame(() =>
                            setSelectedQuestion(questions.length)
                        );
                    }}
                />
                {/* Render the currently selected question.

                    Updates are propagated back to the
                    shared assessment draft through
                    updateQuestion(). */}
                <div className={styles.content}>
                    {
                        questions.length > 0 &&
                        <QuestionCard
                            key={
                                questions[selectedQuestion].id
                            }
                            index={selectedQuestion}
                            question={
                                questions[selectedQuestion]
                            }
                            updateQuestion={updateQuestion}
                            removeQuestion={removeQuestion}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
/*
Production Improvements
1. Instead of

requestAnimationFrame(() =>
    setSelectedQuestion(
        questions.length
    )
);

Try implementing & write

const handleAddQuestion = () => {
    addQuestion();
    requestAnimationFrame(() => {
        setSelectedQuestion(
            previous => previous + 1
        );
    });
};

Then

<QuestionNavigator
...
addQuestion={handleAddQuestion}
/>

This will keep JSX cleaner and makes the logic reusable.

2. Potential bug

This line:
setSelectedQuestion(
    questions.length
)

works because the new question will appear at the end.

However, it's relying on the old array length.

A clearer version would be:

const nextIndex = questions.length;
addQuestion();
requestAnimationFrame(() => {
    setSelectedQuestion(nextIndex);
});

The intent is more obvious to someone reading the code.

3. Safety check

Currently we are doing

questions[selectedQuestion]
multiple times.

If something unexpected happens (for example, the selected question is deleted), you could end up accessing undefined.
(This is happening right now, if u delete multiple question we return undefined)
I'd add:

const activeQuestion =
    questions[selectedQuestion];
Then:

{
activeQuestion &&
<QuestionCard
    question={activeQuestion}
...

This avoids repeated indexing and makes the component more resilient.

4. Rename content

rename:

.content

to

.questionEditor

because "content" is a bit generic. (Small thing to do in future update of this file).
*/