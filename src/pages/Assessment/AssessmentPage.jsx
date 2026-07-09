/*

Purpose

Acts as the route-level container for the Assessment
module.

Responsibilities

• Renders the Assessment feature.
• Keeps routing logic separate from feature logic.
• Future route guards or permission checks can be
  implemented here without modifying the feature.

==========================================================
*/

/* ============================
   Feature Components
============================ */

import Assessment from "../../components/assessment/Assessment";

/**
 * AssessmentPage
 *
 * Entry point for the Assessment module.
 *
 * Returns
 * -------
 * JSX.Element
 *      Assessment dashboard and management interface.
 */
export default function AssessmentPage() {
    return <Assessment />;
}
