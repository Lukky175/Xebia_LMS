/*
==========================================================
Question Card

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Displays and edits a single assessment
question.

Responsibilities

• Edit question statement.
• Change question type.
• Manage answer options.
• Configure correct answers.
• Configure marks.
• Add explanation.
• Delete question.

Architecture

  QuestionBuilderStep
        │
        ▼
   QuestionCard
        │
        ▼
    OptionCard
        │
        ▼
   updateQuestion()
        │
        ▼
draftAssessment.questions

Notes

This component never stores its own question
state.

Every change is immediately propagated to the
shared assessment draft.

Future

• Duplicate Question
• Drag & Drop
• AI Question Generator
• AI Question Review
• Rich Text Editor
• Image Upload
• Audio Questions
==========================================================
*/

/*
==========================================================

Question Type drives the entire editing
experience.

Changing the question type changes both

• UI

and

• Data Structure

Single Choice
    ↓
Radio Buttons

Multiple Choice
    ↓
Checkboxes

True / False
    ↓
Auto-generated options

Subjective
    ↓
No answer options

Fill in the Blank
    ↓
Text answer

This architecture allows additional question
types to be introduced later without changing
the overall Question Builder workflow.

==========================================================
*/

import styles from "./QuestionCard.module.css";

import OptionCard from "./OptionCard";

import {

    FiTrash2,
    FiImage,
    FiPlus

} from "react-icons/fi";

/*
==========================================================
Supported Question Types

Each question type controls

• Rendering
• Validation
• Answer Structure

Adding a new type only requires extending
this configuration and updating the rendering
logic below.

==========================================================
*/
const QUESTION_TYPES = [

    {
        value: "single",
        label: "Single Choice"
    },

    {
        value: "multiple",
        label: "Multiple Choice"
    },

    {
        value: "truefalse",
        label: "True / False"
    },

    {
        value: "subjective",
        label: "Subjective"
    },

    {
        value: "fillblank",
        label: "Fill in the Blank"
    }

];


/**
 * QuestionCard
 *
 * Displays the editor for a single
 * assessment question.
 *
 * Props
 * -----
 * index
 *
 * question
 *
 * updateQuestion
 *
 * removeQuestion
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function QuestionCard({
    index,
    question,
    updateQuestion,
    removeQuestion
}) {

/* ==========================================
   Update Question Field

   Updates a single property while preserving
   every other question attribute.

   Example

   updateField("statement","React")

========================================== */
    const updateField = (field, value) => {
        updateQuestion({
            ...question,
            [field]: value
        });

    };

    /* ==========================================
    Add Answer Option

    Creates a new empty answer option.

    Rules:-
    Minimum Options: 2
    Maximum Options: 8

    Future validation rules may be moved
    to the backend.
    ========================================== */

    const addOption = () => {

        if (question.options.length >= 8) {

            alert(
                "Maximum 8 options allowed."
            );

            return;

        }

        updateQuestion({

            ...question,

            options: [

                ...question.options,

                {

                    id: Date.now(),

                    text: "",

                    image: null

                }

            ]

        });

    };

    /* ==========================================
    Change Question Type

    Different question types require different
    data structures.

    Example

    Single/Multiple Choice:- Options
    True / False:-  auto-generated options
    Subjective:- Text Area
    Fill in the Blank:- Fill Options

    Existing question data is transformed
    to match the selected type.
    ========================================== */

    const changeQuestionType = (type) => {

        // Replace existing options with predefined
        // True / False choices.
        if (type === "truefalse") {
            updateQuestion({
                ...question,
                questionType: type,
                options: [
                    {
                        id: 1,
                        text: "True",
                        image: null
                    },

                    {
                        id: 2,
                        text: "False",
                        image: null
                    }

                ],
                correctAnswers: []
            });

            return;

        }

        // Switching away from True / False.

        //
        // Restore two editable options.
        //
        if (
            question.questionType === "truefalse"
        ) {

            updateQuestion({
                ...question,
                questionType: type,
                options: [
                    {
                        id: Date.now(),
                        text: "",
                        image: null
                    },

                    {
                        id: Date.now()+1,
                        text: "",
                        image: null
                    }

                ],
                correctAnswers: []
            });
            return;

        }
        updateQuestion({
            ...question,
            questionType: type
        });

    };

    /*
    ==========================================================
    Component Layout

    Header
    ↓
    Question Statement
    ↓
    Question Image
    ↓
    Answer Options
    ↓
    Marks
    ↓
    Correct Answer
    ↓
    Explanation
    ↓
    Explanation Image
    ==========================================================
    */
    return (
        <div className={styles.card}>
            {/* ==========================================
                Question Header

                Displays question metadata and editing
                controls.
            ========================================== */}

            <div className={styles.header}>
                <div>
                    <h3>
                        Question {index + 1}
                    </h3>

                    <p className={styles.subtitle}>
                        {question.questionType === "single"
                            ? "Single Choice"
                            : question.questionType === "multiple"
                            ? "Multiple Choice"
                            : question.questionType === "truefalse"
                            ? "True / False"
                            : question.questionType === "subjective"
                            ? "Subjective"
                            : "Fill in the Blank"}
                    </p>

                </div>

                <div className={styles.headerActions}>

                    {/* Select the question format.

                    Changing the question type may rebuild
                    the underlying question structure. */}

                    <select
                        className={styles.questionType}
                        value={question.questionType}
                        onChange={(event)=>
                            changeQuestionType(
                                event.target.value
                            )
                        }
                    >
                        {
                            QUESTION_TYPES.map(type=>
                                <option
                                    key={type.value}
                                    value={type.value}
                                >
                                    {type.label}
                                </option>
                            )
                        }
                    </select>

                    {/* Determines whether learners must answer
                        this question before submission. */}

                    <select
                        className={styles.mandatorySelect}
                        value={
                            question.isMandatory
                                ? "mandatory"
                                : "optional"
                        }
                        onChange={(event)=>
                            updateField(
                                "isMandatory",
                                event.target.value === "mandatory"
                            )
                        }
                    >
                        <option value="optional">
                            Non-Mandatory
                        </option>

                        <option value="mandatory">
                            Mandatory
                        </option>
                    </select>

                    {/* Remove this question from the assessment. */}
                    <button
                        className={styles.deleteButton}
                        onClick={()=>
                            removeQuestion(question.id)
                        }
                    >
                        <FiTrash2/>
                    </button>
                </div>
            </div>

            {/* ==========================================
                Question Statement

                Primary text displayed to learners.
            ========================================== */}
            {/* Future

                Upload an image associated with this
                question.

                Backend integration will upload the
                selected image and store its URL.
            */}
            <div className={styles.formGroup}>
                <label>
                    Question Statement
                </label>

                <textarea
                    rows={5}
                    placeholder="Write your question here..."
                    value={question.statement}
                    onChange={(event)=>
                        updateField(
                            "statement",
                            event.target.value
                        )
                    }
                />
            </div>

            <button
                className={styles.imageButton}
                type="button"
            >
                <FiImage />
                Upload Question Image
            </button>

            {/* ==========================================
                Answer Options

                Render answer options for question types
                that require selectable answers.

                Subjective and Fill in the Blank
                questions do not use answer options.
            ========================================== */}

            {
                question.questionType !== "subjective" &&
                question.questionType !== "fillblank" &&
                <div className={styles.optionsSection}>
                    <div className={styles.optionHeader}>
                        <h4>
                            Answer Options
                        </h4>

                        <button
                            className={styles.addOption}
                            type="button"
                            onClick={addOption}
                        >
                            <FiPlus />
                            Add Option
                        </button>
                    </div>
                    {
                        question.options.map(
                        (option, optionIndex) => (
                            <OptionCard
                                key={option.id}
                                option={option}
                                optionIndex={optionIndex}
                                question={question}
                                updateQuestion={updateQuestion}
                            />
                        )
                    )
                    }
                </div>
            }

            {/* ==========================================
                    Scoring

                    Configure positive and negative marks
                    awarded for this question.
                ========================================== */}

            <div className={styles.markGrid}>
                <div className={styles.formGroup}>
                    <label>
                        Correct Marks
                    </label>

                    <input
                        type="number"
                        value={question.positiveMarks}
                        onChange={(event)=>
                            updateField(
                                "positiveMarks",
                                Number(event.target.value)
                            )
                        }
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>
                        Incorrect Marks
                    </label>

                    <input
                        type="number"
                        value={question.negativeMarks}
                        onChange={(event)=>
                            updateField(
                                "negativeMarks",
                                Number(event.target.value)
                            )
                        }
                    />
                </div>
            </div>
            
            {/* ==========================================
                Correct Answer Configuration

                Rendering depends on the selected
                question type.

                Single Choice

                    Dropdown

                Multiple Choice

                    Checkboxes

                Fill in the Blank

                    Text Input

            ========================================== */}
                {
                    question.questionType === "single" ||
                    question.questionType === "truefalse"
                        ?
                        <div className={styles.formGroup}>
                            <label>
                                Correct Answer
                            </label>

                            <select
                                value={
                                    question.correctAnswers[0] || ""
                                }
                                onChange={(event)=>{
                                    updateField(
                                        "correctAnswers",
                                        [Number(event.target.value)]
                                    );
                                }}
                            >
                                <option value="">
                                    Select Correct Option
                                </option>
                                {
                                    question.options.map(option=>
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.text || "Untitled Option"}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        :
                        question.questionType==="multiple"
                        ?
                        <div className={styles.formGroup}>
                            <label>
                                Correct Answers
                            </label>
                            <div className={styles.correctOptions}>
                                {
                                    question.options.map(option=>
                                        <label
                                            key={option.id}
                                            className={styles.correctOption}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={
                                                    question.correctAnswers.includes(
                                                        option.id
                                                    )
                                                }
                                                onChange={(event)=>{
                                                    if(event.target.checked){
                                                        updateField(
                                                            "correctAnswers",
                                                            [
                                                                ...question.correctAnswers,
                                                                option.id
                                                            ]
                                                        );
                                                    }
                                                    else{
                                                        updateField(
                                                            "correctAnswers",
                                                            question.correctAnswers.filter(
                                                                id=>id!==option.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            />
                                            <span>
                                                {option.text || "Untitled Option"}
                                            </span>
                                        </label>
                                    )
                                }
                            </div>
                        </div>
                        :
                        question.questionType==="fillblank"
                        ?
                        <div className={styles.formGroup}>
                            <label>
                                Correct Answer
                            </label>
                            <input
                                type="text"
                                placeholder="Correct Answer"
                                value={
                                    question.correctAnswerText || ""
                                }
                                onChange={(event)=>
                                    updateField(
                                        "correctAnswerText",
                                        event.target.value
                                    )
                                }
                            />
                        </div>
                        :
                        null
                }

            {/* ==========================================
                Solution Explanation

                Optional explanation shown after the
                learner submits the assessment.
            ========================================== */}

            <div className={styles.formGroup}>
                <label>
                    Explanation
                </label>
                <textarea
                    rows={4}
                    placeholder="Explain why this is the correct answer..."
                    value={question.explanation}
                    onChange={(event)=>
                        updateField(
                            "explanation",
                            event.target.value
                        )
                    }
                />
            </div>

            {/* ======================================
            Explanation Image
            ====================================== */}
            <button
                className={styles.imageButton}
                type="button"
            >
                <FiImage />
                Upload Explanation Image (Optional)
            </button>
        </div>
    );
}