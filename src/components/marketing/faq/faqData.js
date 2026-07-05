/**
 * ==========================================================
 * Purpose:
 * Centralized source of FAQ content used by the
 * FAQ component.
 *
 * Benefits:
 * - Separates content from presentation logic.
 * - Makes maintenance easier.
 * - Allows future API integration without
 *   modifying the UI component.
 * ==========================================================
 */

export const faqItems = [
    {
        question: "Can I enroll in multiple courses at once?",
        answer:
            "Yes! You can enroll in as many courses as you want and learn at your own pace without any limits.",
    },
    {
        question: "What kind of support can I get?",
        answer:
            "You can contact instructors, access discussion forums, and reach out to our support team through the Contact Us page.",
    },
    {
        question: "Are there any prerequisites for the courses?",
        answer:
            "Some advanced courses may require prior knowledge, but most beginner courses are open to everyone.",
    },
    {
        question: "Are the courses self-paced?",
        answer:
            "Yes. Most courses are self-paced, allowing you to learn according to your own schedule.",
    },
    {
        question: "How will I receive my certificates?",
        answer:
            "Certificates are automatically generated and can be downloaded after successfully completing all course requirements.",
    },
];