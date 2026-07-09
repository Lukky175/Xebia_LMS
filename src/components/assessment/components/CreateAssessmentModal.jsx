/*
==========================================================
Create Assessment Modal

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Acts as the main container for the multi-step
Assessment Creation Wizard.

This component coordinates every step involved in
creating a new assessment.

Responsibilities

• Display the assessment creation modal.
• Manage wizard navigation.
• Render the appropriate wizard step.
• Coordinate assessment draft creation.
• Submit the completed assessment draft.
• Connect UI components with the Assessment
  Builder hook.

Architecture

Assessment
      │
      ▼
CreateAssessmentModal
      │
      ▼
useAssessmentBuilder()
      │
      ├── BasicInfoStep
      ├── AssessmentMethodStep
      ├── QuestionBuilderStep
      └── ReviewStep
      │
      ▼
Assessment Draft
      │
      ▼
Assessment Service
      │
      ▼
Backend API (Future)

Notes

This component intentionally contains very little
business logic.

All wizard state is managed by
useAssessmentBuilder().

Future Integration

The completed assessment draft will eventually be
submitted to the backend using

POST /api/assessments
==========================================================
*/

/* ============================
   Styles
============================ */
import styles from "./CreateAssessmentModal.module.css";

/* ============================
   Icons
============================ */
import { FiX } from "react-icons/fi";

/* ============================
   Custom Hooks
============================ */
import useAssessmentBuilder from "../hooks/useAssessmentBuilder";

/* ============================
   Wizard Steps
============================ */
import ProgressStepper from "../createAssessment/ProgressStepper";
import BasicInfoStep from "../createAssessment/BasicInfoStep";
import AssessmentMethodStep from "../createAssessment/AssessmentMethodStep";
import QuestionBuilderStep from "../createAssessment/QuestionBuilderStep";
import ReviewStep from "../createAssessment/ReviewStep";


/**
 * CreateAssessmentModal
 *
 * Main container for the Assessment Creation Wizard.
 *
 * Props
 * -----
 * open
 *      Controls modal visibility.
 *
 * onClose
 *      Invoked when the modal should close.
 *
 * onCreate
 *      Receives the completed assessment draft.
 *
 * Returns
 * -------
 * JSX.Element | null
 */
export default function CreateAssessmentModal({
    open,
    onClose,
    onCreate
}) {
    /*
    Only render the modal when it has been opened.

    Returning null completely removes the modal from
    the React component tree, improving performance.
    */
    if (!open) return null;
    /*
    ==========================================================
    Assessment Builder

    Provides the complete state management for the
    assessment creation wizard.

    The hook owns

    • Current wizard step
    • Draft assessment
    • Question management
    • Navigation
    • Draft updates

    Keeping all state inside a custom hook allows
    this component to remain focused on rendering.
    ==========================================================
    */
    const {
        currentStep,
        nextStep,
        previousStep,
        draftAssessment,
        updateBasicInfo,
        updateCreationMethod,
        addQuestion,
        updateQuestion,
        removeQuestion
    } = useAssessmentBuilder();

    /*
    ==========================================================
    Wizard Step Renderer

    Determines which wizard step should be displayed
    based on the current step.

    Current Flow

    Step 1
    Basic Information

    ↓

    Step 2
    Assessment Method

    ↓

    Step 3
    Question Builder

    ↓

    Step 4
    Review


    This function isolates rendering logic from the
    main JSX, making the modal easier to maintain.
    ==========================================================
    */

    const renderStep = () => {

        switch (currentStep) {
            // Step 1
            // Collect assessment metadata.
            case 1:
                return (
                    <BasicInfoStep
                        draftAssessment={draftAssessment}
                        updateBasicInfo={updateBasicInfo}
                    />
                );
            // Step 2
            // Select how the assessment will be created.
            case 2:
                return (
                    <AssessmentMethodStep
                        creationMethod={
                            draftAssessment.creationMethod
                        }
                        setCreationMethod={
                            updateCreationMethod
                        }
                    />
                );

            // Step 3
            // Build assessment questions.
            case 3:
                return (
                    <QuestionBuilderStep
                        questions={
                            draftAssessment.questions
                        }
                        addQuestion={
                            addQuestion
                        }
                        updateQuestion={
                            updateQuestion
                        }
                        removeQuestion={
                            removeQuestion
                        }
                    />
                );

            // Step 4
            // Review assessment before submission.
            case 4:
                return (
                    <ReviewStep
                        draftAssessment={draftAssessment}
                    />
                );

            default:
                return null;

        }

    };



/*
==========================================================
Save Assessment Draft

Final step of the wizard.

Current Behaviour

Every newly created assessment is saved as

DRAFT

This allows future workflows such as

   Trainer
      │
      ▼
    Draft
      │
      ▼
 Admin Approval
      │
      ▼
  Published


Future Backend Flow


CreateAssessmentModal
        │
        ▼
useAssessment()
        │
        ▼
assessmentService()
        │
        ▼
POST /api/assessments

==========================================================
*/

    const handleSaveDraft = () => {
        onCreate({

            ...draftAssessment,
            // Ensure every new assessment begins
            // in the Draft state.
            status: "DRAFT"
        });
        onClose();
    };

    /*
    ==========================================================
    Modal Layout

    1. Header
    2. Progress Stepper
    3. Current Wizard Step
    4. Navigation Footer
    ==========================================================
    */
    return (

        <div className={styles.overlay}>

            <div className={styles.modal}>

                {/* ==========================================
                    Modal Header

                    Displays the wizard title together with
                    a short description.

                    Also provides the close action.
                ========================================== */}

                <div className={styles.header}>

                    <div>

                        <h2>

                            Create Assessment

                        </h2>

                        <p>

                            Build assessments using our guided wizard.

                        </p>

                    </div>

                    <button

                        className={styles.closeButton}

                        onClick={onClose}

                    >

                        <FiX size={22} />

                    </button>

                </div>



                {/* ==========================================
                    Progress Indicator

                    Displays the user's current position
                    within the Assessment Creation Wizard.

                    The stepper is synchronized with the
                    current wizard step.
                ========================================== */}

                <ProgressStepper

                    currentStep={currentStep}

                />



                {/* ==========================================
                    Wizard Content

                    Render the component associated with the
                    current wizard step.

                    Only one step is visible at a time.
                ========================================== */}

                <div className={styles.body}>

                    {renderStep()}

                </div>



                {/* ==========================================
                    Wizard Navigation

                    Provides navigation between wizard steps.

                    Available Actions

                    • Cancel

                    • Back

                    • Next

                    • Create Assessment
                ========================================== */}

                <div className={styles.footer}>
                    <button
                        className={styles.secondaryButton}
                        onClick={onClose}
                    >
                        Cancel
                    </button>


                    {/* Back Button (Available from Step 2 onwards) */}
                    <div className={styles.navigation}>
                        {
                            currentStep > 1 &&
                            <button
                                className={styles.secondaryButton}
                                onClick={previousStep}
                            >
                                Back
                            </button>
                        }


                    {/* Continue to the next wizard step. */}
                        {
                            currentStep < 4
                                ?
                                <button
                                    className={styles.primaryButton}
                                    onClick={nextStep}
                                >
                                    Next
                                </button>
                                :
                                /* Final wizard action.
                                    Creates the assessment draft and closes
                                    the modal. */
                                <button
                                    className={styles.primaryButton}
                                    onClick={handleSaveDraft}
                                >
                                    Create Assessment
                                </button>
                        }
                    </div>

                </div>

            </div>

        </div>

    );

}
/*
Future Enhancement

Navigation buttons will perform step-specific
validation before allowing users to continue.

Example

Basic Information must be complete before
moving to Step 2.
*/