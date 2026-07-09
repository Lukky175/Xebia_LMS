/*
==========================================================
Option Card

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Represents a single answer option within an
assessment question.

Responsibilities

• Display the option label.
• Edit option text.
• Remove an option.
• Trigger option image upload.
• Notify the parent component of updates.

Architecture

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

This component never stores option state.

All updates are immediately propagated to
the shared assessment draft through
updateQuestion().

Future Enhancements

• Drag & Drop Reordering
• Image Preview
• Cloud Image Upload
• AI Suggestion
• Rich Text Options
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./OptionCard.module.css";

/* ============================
   Icons
============================ */
import { FiTrash2, FiImage} from "react-icons/fi";

/* ==========================================
   Option Labels

   Human-readable labels displayed for
   objective answer options.

   Supports up to eight options per
   question.
========================================== */
const LETTERS = [

    "A",

    "B",

    "C",

    "D",

    "E",

    "F",

    "G",

    "H"

];

/**
 * OptionCard
 *
 * Displays and edits a single answer option.
 *
 * Props
 * -----
 * option
 *      Current option object.
 *
 * optionIndex
 *      Position of the option within the
 *      question.
 *
 * question
 *      Parent question.
 *
 * updateQuestion
 *      Updates the parent question.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function OptionCard({

    option,

    optionIndex,

    question,

    updateQuestion

}){

    /* ==========================================
    Update Option

    Updates the text of the current answer
    option while preserving all remaining
    options.

    Since the draft assessment is immutable,
    a new options array is created before
    updating the parent question.
    ========================================== */

    const updateOption = (value)=>{

        const updatedOptions =

            question.options.map(item=>

                item.id===option.id

                    ?

                    {

                        ...item,

                        text:value

                    }

                    :

                    item

            );

        updateQuestion({

            ...question,

            options:updatedOptions

        });

    };

    /* ==========================================
    Remove Option

    Deletes the current answer option.

    Validation

    Objective questions must always contain
    at least two answer options.

    This validation will later be enforced
    by the backend as well.
    ========================================== */

    const removeOption=()=>{

        if(question.options.length<=2){

            alert(

                "Every objective question must have at least two options."

            );

            return;

        }

        updateQuestion({

            ...question,

            options:

                question.options.filter(

                    item=>item.id!==option.id

                )

        });

    };

    /*
    ==========================================================
    Component Layout

    Option Label
        ↓
    Option Text
        ↓
    Image Upload
        ↓
    Delete Option

    ==========================================================
    */
    return(

        <div className={styles.card}>

            {/* Alphabetical label used to identify
                the option inside the question. */}

            <div className={styles.label}>

                {LETTERS[optionIndex]}

            </div>

            {/* Editable answer option.

                Changes are immediately propagated to
                the shared assessment draft. */}

            <input

                type="text"

                value={option.text}

                placeholder={`Option ${LETTERS[optionIndex]}`}

                onChange={(event)=>

                    updateOption(

                        event.target.value

                    )

                }

            />

            {/* Future

                Upload an image associated with this
                answer option.

                Backend integration will upload the
                image and store its URL.
            */}

            <button

                className={styles.iconButton}

                type="button"

            >

                <FiImage/>

            </button>

            {/* Remove this option from the current
                question.

                Disabled logically once only two
                options remain. */}

            <button

                className={styles.deleteButton}

                type="button"

                onClick={removeOption}

            >

                <FiTrash2/>

            </button>

        </div>

    );

}