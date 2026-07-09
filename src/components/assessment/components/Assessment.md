# Assessment Module

**Author:** Lakshit Tyagi  
**Email:** lakshit175@gmail.com  
**Organization:** Xebia  
**Project:** Xebia Learning Management System (LMS)

---

# Overview

The Assessment module manages the complete assessment lifecycle within the Learning Management System.

It provides a centralized interface for viewing assessment statistics, managing existing assessments, and creating new assessments through a guided multi-step wizard.

The module has been designed with scalability and maintainability in mind by separating UI, business logic, and data access into independent layers. This allows backend integration with minimal changes to the existing frontend.

---

# Current Features

The module currently supports:

- Assessment Dashboard
- Assessment Analytics
- Search Assessments
- Table & Grid View
- Pagination
- Recent Activity Timeline
- Multi-step Assessment Creation Wizard
- Question Builder
- Assessment Review
- CRUD operations through the service layer (currently using mock data)

Planned features include:

- Assessment Editing
- AI Question Generation
- PDF Question Import
- Draft Autosave
- Publishing Workflow
- Real Backend Integration

---

# Folder Structure

```
assessment/

├── Assessment.jsx
│   Main controller for the Assessment module.
│
├── components/
│   Dashboard components such as charts,
│   tables, pagination, activity and modal.
│
├── createAssessment/
│   Components used by the Assessment
│   Creation Wizard.
│
├── hooks/
│   Custom hooks responsible for module
│   state and business logic.
│
└── services/
    Data access layer.
    Handles all CRUD operations and future
    backend communication.
```
---

# Folder Responsibilities
```
| Folder | Responsibility |
|----------|----------------|
| components | Dashboard UI components |
| createAssessment | Assessment Creation Wizard |
| hooks | Module state and business logic |
| services | CRUD operations and backend communication |
| constants | Shared enums and configuration |
```
---

# High-Level Architecture

```
AssessmentPage
        │
        ▼
Assessment.jsx
        │
        ├────────────────────────────┐
        ▼                            ▼
Assessment Dashboard        Create Assessment Wizard
        │                            │
        ▼                            ▼
Custom Hooks               useAssessmentBuilder
        │                            │
        └──────────────┬─────────────┘
                       ▼
               assessmentService
                       │
                       ▼
          Mock Data / Future REST API
```
---

# Component Hierarchy
```
AssessmentPage
│
└── Assessment
    │
    ├── MetricsCards
    ├── AssessmentCharts
    ├── AssessmentTable
    │      │
    │      ├── AssessmentToolbar
    │      ├── AssessmentTableBody
    │      ├── AssessmentGrid
    │      └── AssessmentPagination
    │
    ├── RecentActivity
    │
    └── CreateAssessmentModal
            │
            ├── ProgressStepper
            ├── BasicInfoStep
            ├── AssessmentMethodStep
            ├── QuestionBuilderStep
            │      ├── QuestionNavigator
            │      ├── QuestionCard
            │      └── OptionCard
            │
            └── ReviewStep

```

---

# Design Principles

The Assessment module follows a layered architecture.

```
UI Components
      │
      ▼
Custom Hooks
      │
      ▼
Service Layer
      │
      ▼
Mock Data / Backend API
```

### Responsibilities

- **Components** → Render the user interface.
- **Hooks** → Manage state and business logic.
- **Services** → Handle data retrieval and persistence.
- **Data Source** → Mock data today, REST API tomorrow.

UI components should never communicate directly with the backend.

---

# Assessment Dashboard Flow

```
AssessmentPage
      │
      ▼
Assessment.jsx
      │
      ▼
useAssessment()
      │
      ▼
assessmentService.js
      │
      ▼
Assessment Data
```

The dashboard is responsible for:

- Displaying assessment analytics
- Viewing assessments
- Searching assessments
- Switching between Table and Grid views
- Pagination
- Displaying recent assessment activity

---

# Assessment Creation Flow

```
Create Assessment
        │
        ▼
CreateAssessmentModal
        │
        ▼
useAssessmentBuilder()
        │
        ▼
draftAssessment
        │
        ├───────────────┐
        ▼               ▼
Basic Info      Creation Method
        │
        ▼
Question Builder
        │
        ▼
Review
        │
        ▼
assessmentService.createAssessment()
```

The wizard does **not** create an assessment immediately.

Instead, every step updates a shared `draftAssessment` object.

After the final review, the complete draft is submitted to the service layer.

---

# Draft Assessment

The entire wizard operates on a single state object.

```
draftAssessment

├── basicInfo
├── creationMethod
├── questions[]
└── settings
```

Using a single draft object provides:

- Single source of truth
- Easier validation
- Cleaner state management
- Future autosave support
- Easier assessment editing
- Simple API request generation

---

# Service Layer

All assessment data flows through:

```
assessmentService.js
```

Current responsibilities:

- Fetch assessments
- Create assessment
- Update assessment
- Delete assessment

The service layer isolates the UI from the underlying data source.

This means the UI does not need to change when switching from mock data to backend APIs.

---

# Mock Data

The current implementation uses mock data located in:

```
src/data/assessments.js
```

Mock data has been introduced to allow independent frontend development before backend APIs become available.

No UI component should directly import mock data.

All data access must go through `assessmentService.js`.

During backend integration this file should
no longer be used.

---

# API Integration

### Current Flow

```
React Components
        │
        ▼
Custom Hooks
        │
        ▼
assessmentService.js
        │
        ▼
Mock Data
```

# Assessment Object

The frontend currently expects an assessment
object with the following structure.

{
    id,
    title,
    description,
    status,
    assessmentType,
    difficulty,
    duration,
    trainer,
    thumbnail,
    createdAt,
    dueDate,
    expectedCandidates,
    submissions,
    averageScore,
    totalQuestions
}

Question

{

id,

question,

questionType,

options,

correctAnswers,

positiveMarks,

negativeMarks,

explanation

}

POST /api/assessments

Request

{

basicInfo:{...},

creationMethod,

questions:[...],

settings:{...}

}

Response

{

id,

status,

createdAt

}

# Data Ownership

Component

↓

Hook

↓

Service

↓

Backend

The ownership of assessment data must
always remain inside the service layer.

Components should never perform direct
network requests.

Hooks should never know endpoint URLs.

# Backend Responsibilities

The backend should provide:

• Assessment CRUD

• Question CRUD

• Thumbnail Upload

• Course List

• Batch List

• University List

• Validation

• Pagination

• Filtering

• Search

• Analytics

### Future Flow

```
React Components
        │
        ▼
Custom Hooks
        │
        ▼
assessmentService.js
        │
        ▼
REST API
        │
        ▼
Spring Boot Backend
        │
        ▼
Database
```

Only **assessmentService.js** should require modification during backend integration.

No component or hook should contain direct API calls.

# Validation Rules

Assessment

• Title is required

• Description is required

• At least one Course

• At least one Question

Questions

• Minimum two options

• At least one correct answer

• Positive marks >= 0

• Negative marks <= 0

• Question cannot be empty

### Expected API Mapping

| Service Function | HTTP Method | Endpoint |
|------------------|------------|----------|
| getAssessments() | GET | `/api/assessments` |
| createAssessment() | POST | `/api/assessments` |
| updateAssessment() | PUT | `/api/assessments/{id}` |
| deleteAssessment() | DELETE | `/api/assessments/{id}` |

Additional APIs expected:

- `GET /api/courses`
    "-Returns id, name, code"
- `GET /api/batches`
    "-Returns id, batch, code"
- `GET /api/universities`
    "-Returns id, name, code"
- `POST /api/upload/thumbnail`

---

# Backend Integration Guidelines

When integrating the backend:

- Replace mock implementations inside `assessmentService.js`.
- Keep component logic unchanged.
- Keep hooks interacting only with the service layer.
- Return consistent response structures from the backend.
- Maintain the existing architecture to avoid unnecessary UI changes.

---

# Future Enhancements

- Assessment Editing
- AI Question Generation
- PDF Question Import
- Autosave Drafts
- Cloud Image Upload
- Assessment Publishing Workflow
- Validation Engine
- Role-based Assessment Permissions
- Live Assessment Analytics

---

Future versions should support server-side:

• Search

• Pagination

• Sorting

• Filtering

to avoid loading all assessments into the browser.

---
# Error Handling

The service layer should expose consistent
errors to the UI.

Example

404

409

500

Validation Errors

The UI should never interpret raw backend
exceptions.

---
# Development Guidelines

When extending this module:

• Add new UI inside components/

• Add business logic inside hooks/

• Add backend communication inside services/

• Never call APIs directly from components.

• Keep draftAssessment as the single source of truth for the wizard.

• Preserve the existing architecture to ensure future maintainability.

---
# Module Summary

The Assessment module has been built using a clean layered architecture that separates presentation, business logic, and data access.

Its design enables easy maintenance, straightforward backend integration, and future feature expansion while keeping React components focused solely on rendering the user interface.