/*
==========================================================
Assessment Module Mock Data
Author:- Lakshit Tyagi || Bennett Univesrity || lakshit175@gmail.com
========================================================== */

/*
==========================================================
Since mockData file was getting very large and exporting everything i have created this file.
This File Consists of the mock data that is being used in Assesment Module
========================================================== */

/*
==========================================================
This file contains all mock data used by the Assessment
module.

Later this file will be replaced by API calls without
changing the UI.
==========================================================
*/

export const initialAssessments = [

    {
        id: 1,

        title: "Full-Stack Quiz-1",

        description:
            "Enterprise certification covering React, JavaScript and System Design.",

        thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",

        assessmentType: "MCQ",

        difficulty: "MEDIUM",

        organisationId: 1,

        courseIds: [1, 2],

        assignedBatchIds: [1],

        trainer:{
            id:1,
            name:"Mannat Kapoor"
        },

        duration: 90,

        totalQuestions: 60,

        totalMarks: 100,

        passingMarks: 40,

        expectedCandidates: 100,

        submissions: 84,

        averageScore: 81,

        highestScore: 98,

        lowestScore: 43,

        instructions:
            "Read every question carefully before submitting.",

        shuffleQuestions: true,

        shuffleOptions: true,

        negativeMarking: false,

        maxAttempts: 1,

        visibility: "PRIVATE",

        status: "ACTIVE",

        createdBy: {
            id: 1,
            name: "Sarah Jenkins"
        },

        createdAt: "2026-06-12",

        dueDate: "2026-07-15"
    },

    {
        id: 2,

        title: "React Fundamentals Quiz",

        description:
            "Short assessment covering React fundamentals.",

        thumbnail:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",

        assessmentType: "MCQ",

        difficulty: "EASY",

        organisationId: 2,

        courseIds: [1],

        assignedBatchIds: [2],

        trainer:{
            id:2,
            name:"Lakshit Tyagi"
        },

        duration: 30,

        totalQuestions: 20,

        totalMarks: 20,

        passingMarks: 10,

        expectedCandidates: 180,

        submissions: 152,

        averageScore: 74,

        highestScore: 20,

        lowestScore: 6,

        instructions:
            "Choose the best answer for each question.",

        shuffleQuestions: true,

        shuffleOptions: false,

        negativeMarking: false,

        maxAttempts: 1,

        visibility: "PRIVATE",

        status: "DRAFT",

        createdBy: {
            id: 2,
            name: "Alex Rivera"
        },

        createdAt: "2026-06-28",

        dueDate: "2026-07-20"
    },



    {
        id: 3,

        title: "Cloud Native Assessment",

        description:
            "Assessment covering Docker, Kubernetes and Cloud Native concepts.",

        thumbnail:
            "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=900&q=80",

        assessmentType: "MCQ",

        difficulty: "ADVANCED",

        organisationId: 3,

        courseIds: [3],

        assignedBatchIds: [3],

        trainer:{
            id:2,
            name: "Apurv Jha"
        },

        duration: 120,

        totalQuestions: 80,

        totalMarks: 150,

        passingMarks: 70,

        expectedCandidates: 60,

        submissions: 49,

        averageScore: 68,

        highestScore: 140,

        lowestScore: 52,

        instructions:
            "Attempt all questions before submitting.",

        shuffleQuestions: true,

        shuffleOptions: true,

        negativeMarking: true,

        maxAttempts: 1,

        visibility: "PRIVATE",

        status: "ACTIVE",

        createdBy: {
            id: 1,
            name: "Admin"
        },

        createdAt: "2026-05-14",

        dueDate: "2026-07-10"
    },



    {
        id: 4,

        title: "Docker & Kubernetes Test",

        description:
            "Infrastructure deployment practical assessment.",

        thumbnail:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",

        assessmentType: "MCQ",

        difficulty: "INTERMEDIATE",

        organisationId: 7,

        courseIds: [3],

        assignedBatchIds: [4],

        trainer:{
            id:2,
            name: "Abhishek"
        },

        duration: 75,

        totalQuestions: 45,

        totalMarks: 75,

        passingMarks: 35,

        expectedCandidates: 140,

        submissions: 118,

        averageScore: 87,

        highestScore: 75,

        lowestScore: 41,

        instructions:
            "Read each question carefully before answering.",

        shuffleQuestions: true,

        shuffleOptions: true,

        negativeMarking: false,

        maxAttempts: 2,

        visibility: "PRIVATE",

        status: "COMPLETED",

        createdBy: {
            id: 1,
            name: "Admin"
        },

        createdAt: "2026-04-18",

        dueDate: "2026-06-01"
    }

];



/* ==========================================================
   Dashboard Metrics
   ========================================================== */

export const assessmentMetrics = {
    totalAssessments: initialAssessments.length,

    activeAssessments: initialAssessments.filter(
        assessment => assessment.status === "ACTIVE"
    ).length,

    draftAssessments: initialAssessments.filter(
        assessment => assessment.status === "DRAFT"
    ).length,

    completedAssessments: initialAssessments.filter(
        assessment => assessment.status === "COMPLETED"
    ).length,

    averageScore: Math.round(
        initialAssessments.reduce(
            (sum, assessment) => sum + assessment.averageScore,
            0
        ) / initialAssessments.length
    ),

    totalExpectedCandidates: initialAssessments.reduce(
        (sum, assessment) => sum + assessment.expectedCandidates,
        0
    ),

    totalSubmissions: initialAssessments.reduce(
        (sum, assessment) => sum + assessment.submissions,
        0
    )
};



/* ==========================================================
   Expected vs Actual Attempts Graph
   ========================================================== */

export const assessmentAttemptsGraph = [

    {
        month: "Jan",
        expected: 80,
        completed: 72
    },

    {
        month: "Feb",
        expected: 95,
        completed: 88
    },

    {
        month: "Mar",
        expected: 120,
        completed: 104
    },

    {
        month: "Apr",
        expected: 110,
        completed: 90
    },

    {
        month: "May",
        expected: 130,
        completed: 121
    },

    {
        month: "Jun",
        expected: 150,
        completed: 138
    }

];



/* ==========================================================
   Average Score Graph
   ========================================================== */

export const assessmentScoreGraph = [

    {
        month: "Jan",
        expected: 80,
        average: 74
    },

    {
        month: "Feb",
        expected: 80,
        average: 77
    },

    {
        month: "Mar",
        expected: 80,
        average: 82
    },

    {
        month: "Apr",
        expected: 80,
        average: 79
    },

    {
        month: "May",
        expected: 80,
        average: 81
    },

    {
        month: "Jun",
        expected: 80,
        average: 84
    }

];



/* ==========================================================
   Recent Activity
   ========================================================== */

export const assessmentActivity = [

    {
        id: 1,

        title: "New Submission Received",

        description:
            "John Doe completed Q3 Engineering Certification.",

        time: "2 mins ago"
    },

    {
        id: 2,

        title: "Assessment Published",

        description:
            "React Fundamentals Quiz has been published.",

        time: "45 mins ago"
    },

    {
        id: 3,

        title: "Assessment Assigned",

        description:
            "Cloud Native Assessment assigned to DevOps Advanced Batch.",

        time: "3 hours ago"
    },

    {
        id: 4,

        title: "Assessment Closed",

        description:
            "Docker & Kubernetes Test has been closed successfully.",

        time: "Yesterday"
    }

];

/*
==========================================================
Dropdown Data
==========================================================
*/

export const courseOptions = [

    {
        id: 1,
        label: "Enterprise React"
    },

    {
        id: 2,
        label: "Node.js Microservices"
    },

    {
        id: 3,
        label: "Docker & Kubernetes"
    },

    {
        id: 4,
        label: "Cloud Native"
    }

];

export const batchOptions = [

    {
        id: 1,
        label: "Frontend Bootcamp 2026"
    },

    {
        id: 2,
        label: "React Cohort A"
    },

    {
        id: 3,
        label: "DevOps Advanced"
    },

    {
        id: 4,
        label: "Platform Engineering"
    }

];

export const universityOptions = [

    {
        id: 1,
        label: "Bennett University"
    },

    {
        id: 2,
        label: "Lovely Professional University"
    },

    {
        id: 3,
        label: "Thapar Institute"
    },

    {
        id: 4,
        label: "Delhi Technological University"
    }

];