/*
==========================================================
Thumbnail Upload

Author       : Lakshit Tyagi
Email        : lakshit175@gmail.com
Organization : Xebia
Project      : Xebia Learning Management System (LMS)

Purpose

Reusable component for selecting and previewing
an assessment thumbnail image.

Responsibilities

• Open the native file picker.
• Generate a local image preview.
• Forward the selected image to the parent.
• Display the current thumbnail preview.

Architecture

BasicInfoStep
        │
        ▼
ThumbnailUpload
        │
        ▼
Selected File
        │
        ▼
draftAssessment.basicInfo.thumbnail

Notes

This component does not upload images.

It only provides local image selection and
preview functionality.

Future Integration

The selected file may later be uploaded to

• Cloudinary
• AWS S3
• Azure Blob Storage
• Backend Media Service

Possible API Flow

Select Image
        │
        ▼
Upload API
        │
        ▼
Image URL
        │
        ▼
Assessment Draft
==========================================================
*/


/*==========================================================
            Future Improvements (Priority)
==========================================================

Right now we do

const file = event.target.files[0];

this accepts anything.


Future Suggestion Add

if (!file.type.startsWith("image/")) {
    return;
}

or maybe

const MAX_SIZE = 5 * 1024 * 1024;

if (file.size > MAX_SIZE) {
    return;
}

Something like this, basically we want only specific file type to be uploaded.
This prevents invalid size uploads. 


==========================================================
            Memory leak (very important) (priority)
==========================================================

right now we are creating

URL.createObjectURL(file)

but we never revoke it.
Eventually, we will clean it up with:

URL.revokeObjectURL(imageUrl);


or use an effect to revoke the previous preview URL when a new image is selected or when the component unmounts. 
Otherwise, repeated uploads can leak memory in long-running sessions.
*/



/* ============================
   React Hooks
============================ */
import { useRef } from "react";

/* ============================
   Styles
============================ */
import styles from "./ThumbnailUpload.module.css";

/* ============================
   Icons
============================ */
import {
    FiUploadCloud,
    FiImage
} from "react-icons/fi";

/**
 * ThumbnailUpload
 *
 * Displays a thumbnail upload area with
 * local image preview.
 *
 * Props
 * -----
 * thumbnail
 *      Current thumbnail object.
 *
 * onChange
 *      Invoked when a new image has been
 *      selected.
 *
 * Returns
 * -------
 * JSX.Element
 */
export default function ThumbnailUpload({

    thumbnail,

    onChange

}) {
    /*
    Reference to the hidden file input.

    Allows the custom upload area to trigger the
    native file picker without displaying the
    default browser input.
    */
    const inputRef = useRef(null);

    /* ==========================================
    Handle Thumbnail Selection

    Reads the selected image from the native
    file picker.

    Generates a temporary preview URL and
    forwards both the original file and the
    preview URL to the parent component.

    The parent stores this inside the shared
    assessment draft.
    ========================================== */


    /*
Future Backend Flow

Selected File

        │

        ▼

Image Validation

        │

        ▼

Cloud Upload

        │

        ▼

Image URL

        │

        ▼

Assessment Draft
*/
    const handleUpload = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        // Generate a temporary browser URL so the
        // image can be previewed immediately without
        // uploading it to a server.
        const imageUrl = URL.createObjectURL(file);

        onChange({

            file,

            preview: imageUrl

        });

    };

    /*
    ==========================================================
    Component Layout

    Label
    ↓
    Upload Area
    ↓
    Preview Image
    or
    Upload Placeholder
    ↓
    Hidden File Input
    ==========================================================
    */
    return (

        <div className={styles.container}>
            {/* ==========================================
                Thumbnail Selection

                Allows users to attach a cover image
                for the assessment.
            ========================================== */}
            <label>
                Assessment Thumbnail
            </label>

            {/* Upload trigger.

                Clicking anywhere inside the upload box
                opens the hidden native file picker. */}
            <div
                className={styles.uploadBox}
                onClick={() =>
                    inputRef.current.click()
                }
            >
                {/* Display the selected thumbnail preview. */}
                {
                    thumbnail?.preview
                    ?
                    <img
                        src={thumbnail.preview}
                        alt="Thumbnail Preview"
                        className={styles.preview}
                    />
                    :
                    <>
                        <FiImage
                            size={46}
                        />

                        <h4>
                            Upload Thumbnail
                        </h4>

                        <p>
                            Click to upload
                        </p>
                    </>
                }
            </div>

            {/* Empty upload state displayed before
                an image has been selected. */}
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                /* Hidden browser file input.

                Triggered programmatically using
                inputRef.current.click(). */
                hidden
                onChange={handleUpload}
            />
        </div>

    );

}