# Xebia LMS Platform Console

Welcome to the **Xebia LMS** frontend codebase! This repository is built with **React**, **Vite**, **Tailwind CSS v4**, and **React Router v6**. It is structured to support multi-developer workflows, local data persistence, and an easy transition to a live backend.

---

## Quick Start & Onboarding

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### 2. Dependency Installation
Run the following command in the root folder of the project to install required library packages (including Lucide icons, Framer Motion, and Tailwind engines):
```bash
npm install
```

### 3. Start Local Development Server
Launch the development server:
```bash
npm run dev
```
Once started, the application will be hosted locally at `http://localhost:5173/`. Visiting the page will immediately redirect you to the main console environment.

### 4. Build for Production
To compile and optimize the client-side bundle for production:
```bash
npm run build
```
This builds optimized assets in the `/dist` directory.

---

## Repository Directory Structure

```
Xebia_LMS/
│
├── src/
│   ├── assets/              # Static media assets (logos, background images)
│   │
│   ├── components/
│   │   ├── layout/          # Dashboard frames, Sidebar controls, Navbar headers
│   │   └── ui/              # Reusable widget cards (BorderGlow, CountUp, Logo)
│   │
│   ├── context/             # Global contexts (ThemeContext for light/dark modes)
│   │
│   ├── data/
│   │   └── mockData.js      # Centralized database arrays (Users, Courses, Tutors)
│   │
│   ├── pages/               # Individual feature sub-pages of the dashboard
│   │   ├── Dashboard/       # Dashboard controller, router, and home charts
│   │   ├── Users/           # Users directory, CRUD logic, and bulk deletes
│   │   ├── Tutors/          # Trainers directory and custom forms
│   │   ├── Courses/         # Course catalogs and progress simulator
│   │   ├── Settings/        # Administration profiles and system configs
│   │   ├── Revenue/         # Finance and MRR overview
│   │   ├── Reports/         # System reports and downloads
│   │   └── Analytics/       # Performance charts
│   │
│   ├── services/
│   │   └── api.js           # Network service client (Mock API and Local Storage)
│   │
│   ├── App.jsx              # Main App wrapper containing global route redirects
│   ├── index.css            # Styles, Google Fonts loading, and design theme variables
│   └── main.jsx             # DOM mounting entry point
│
├── DESIGN_SYSTEM.md         # Reference manual for fonts, zinc colors, and spacings
└── README.md                # Onboarding and development instructions (This file)
```

---

## UI Element & File Reference Map

If you want to customize specific layout elements or feature pages, use this quick map to find their source code:

### Layout Elements

| UI Element | What it does | File to Edit |
| :--- | :--- | :--- |
| **Sidebar Links & Sections** | Add, remove, or change sidebar navigation items, section headers, icons, and logo branding labels. Now supports a sleek transition in collapsed mode. | [Sidebar.jsx](src/components/layout/Sidebar.jsx) |
| **Logo Icon & Container** | Change the main branding logo element or its padding. Adapts dynamically to collapsed state using `/XebiaFavicon.png` for a compact icon view. | [Logo.jsx](src/components/ui/Logo.jsx) |
| **Top Navbar & Breadcrumbs** | Modify header search bar, notify bell, profile cards, and path-to-title breadcrumbs categories mapping. | [Navbar.jsx](src/components/layout/Navbar.jsx) |
| **General Page Frame** | Adjust the flex wrapper that controls the grid positioning of Sidebar, Navbar, and `<main>` viewport scroll dimensions. | [DashboardLayout.jsx](src/components/layout/DashboardLayout.jsx) |
| **Active Sub-Routes** | Configure navigation path patterns inside the React Router `<Routes>` module. | [Dashboard.jsx](src/pages/Dashboard/Dashboard.jsx) |
| **Favicon Icon** | Changes the browser tab icon. | [index.html](index.html) & [public/XebiaFavicon.png](public/XebiaFavicon.png) |

### Page Views

| Feature Page / View | Navigates to | Active Component / File | Description |
| :--- | :--- | :--- | :--- |
| **Admin Dashboard** | `/dashboard` | [DashboardHome.jsx](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L87) | Default dashboard home rendered for Administrators (`admin` role). |
| **Trainer Console** | `/dashboard` (as Trainer) | [TrainerDashboard](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L596) inside [DashboardHome.jsx](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx) | Trainer-specific bento grid dashboard (hours graph, rating tracking, course list). |
| **Student Portal** | `/dashboard` (as Student) | [StudentDashboard](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L740) inside [DashboardHome.jsx](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx) | Learner-specific study activity graphs, courses progression, and streak metrics. |
| **Superadmin Panel** | `/dashboard` (as Superadmin) | [SuperadminHeader](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L89) inside [DashboardHome.jsx](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx) | Admin dashboard home with an added server-monitoring diagnostics toolbar. |
| **Organisations Directory**| `/dashboard/organisations` | [OrganisationsPage.jsx](file:///z:/Xebia_LMS-main/src/pages/Organisations/OrganisationsPage.jsx) | Table list of corporate clients/organisations, with add/delete options. |
| **Users Directory** | `/dashboard/users` | [UsersPage.jsx](file:///z:/Xebia_LMS-main/src/pages/Users/UsersPage.jsx) | Table listing accounts/users with batch updating, role switching, and search actions. |
| **Courses Catalog** | `/dashboard/courses` | [CoursesPage.jsx](file:///z:/Xebia_LMS-main/src/pages/Courses/CoursesPage.jsx) | Course directory. Filters courses differently depending on whether user is a trainer or admin. |
| **Tutors/Trainers Directory** | `/dashboard/trainer` | [TutorsPage.jsx](file:///z:/Xebia_LMS-main/src/pages/Tutors/TutorsPage.jsx) | Directory list of all registered course instructors/trainers. |
| **Finance Center** | `/dashboard/finance` | [RevenuePage.jsx](file:///z:/Xebia_LMS-main/src/pages/Revenue/RevenuePage.jsx) | Financial breakdown charts (MRR, batch costings, revenue metrics). |
| **Administration Panel** | `/dashboard/administration` | [SettingsPage.jsx](file:///z:/Xebia_LMS-main/src/pages/Settings/SettingsPage.jsx) | Settings, profile information, configuration toggle options. |
| **Other modules** | `/dashboard/*` | Displays `BlankPage` component declared in [Dashboard.jsx](file:///z:/Xebia_LMS-main/src/pages/Dashboard/Dashboard.jsx) | Fallback placeholder page view for currently unmapped sidebar navigation routes. |

### Specific Dashboard & Role Features Reference Map

If you need to edit features or behaviors tied to a specific user role, use the links below to navigate to the exact files and key lines:

* **Trainer Dashboard / Console:**
  * **Main Render Check:** [DashboardHome.jsx:L71-73](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L71-L73) — Directs logged-in trainers to the trainer view.
  * **Visual Layout & UI:** [TrainerDashboard Component](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L596-L738) — Bento cards grid, weekly teaching hours bar chart, and course enrollments list.
  * **Sidebar Visibility Rules:** [Sidebar.jsx:L83-88](file:///z:/Xebia_LMS-main/src/components/layout/Sidebar.jsx#L83-L88) — Configures which sidebar tabs are available for a trainer.
  * **Course Filtering & Proposals:** [CoursesPage.jsx:L51-73](file:///z:/Xebia_LMS-main/src/pages/Courses/CoursesPage.jsx#L51-L73) and [CoursesPage.jsx:L108-109](file:///z:/Xebia_LMS-main/src/pages/Courses/CoursesPage.jsx#L108-L109) — Restricts/adjusts course view permissions and labels them as `pending` proposals for trainers.
* **Student Dashboard / Portal:**
  * **Main Render Check:** [DashboardHome.jsx:L75-77](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L75-L77) — Directs logged-in students to the student portal view.
  * **Visual Layout & UI:** [StudentDashboard Component](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L740) — Active learning hours area graph, ongoing course progression bars, and progress indicators.
* **Superadmin Role Diagnostics:**
  * **Main Render Check & Toolbar:** [DashboardHome.jsx:L89-91](file:///z:/Xebia_LMS-main/src/pages/Dashboard/DashboardHome.jsx#L89-L91) — Injects the diagnostics header system (CPU, RAM, workload bars) for superadmins.
* **Trainer Mock Login Account:**
  * **Mock Credentials:** [AuthContext.jsx:L8](file:///z:/Xebia_LMS-main/src/context/AuthContext.jsx#L8) — Username `trainer@xebia.com`, Password `trainer123`.

### Styling, Animations & Glows

| Styling Element | Description | File to Edit |
| :--- | :--- | :--- |
| **Colors, Fonts & Theme** | Declare and override typography, slate/zinc variables, and custom theme variables (light/dark mode colors). | [index.css](src/index.css) |
| **Interactive Glow Card** | Modify the physics, cursor edge-detection, or border gradients of cards. | [BorderGlow.jsx](src/components/ui/BorderGlow.jsx) & [BorderGlow.css](src/components/ui/BorderGlow.css) |
| **Count Up Text** | Controls number format mappings (used for bento grid metrics). | [CountUp.jsx](src/components/ui/CountUp.jsx) |

---

## Authentication & Role-Based Access Control

The application implements a full **Mock Authentication & Role-Based Access Control (RBAC)** flow on the frontend. The active session is maintained via `localStorage`.

### 1. Mock Credentials
You can log in to the platform console using any of these pre-configured user credentials:

| Role | Email | Password | What You See |
| :--- | :--- | :--- | :--- |
| **Superadmin** | `superadmin@xebia.com` | `superadmin123` | Full dashboard view + extra **Superadmin System Diagnostics** control panel. |
| **Admin** | `admin@xebia.com` | `admin123` | Full platform dashboard (Active users, MRR, completions, servers workload). |
| **Trainer** | `trainer@xebia.com` | `trainer123` | **Trainer Console** (Teaching hours bar graphs, assigned batches count, average trainer ratings, my courses widget). |
| **Student** | `student@xebia.com` | `student123` | **Student Portal** (Weekly study activity area graphs, ongoing courses progress bars, learning streak counters). |

### 2. User Sign Up
Users can register custom accounts at `/signup`:
* You can fill in your name, email, password, and **select your role** from a dropdown.
* Submitting the registration saves the user details inside `localStorage` (`lms_registered_users`). You can immediately log in at `/login` using the newly created account.

### 3. Route Guarding
Client-side routes are protected inside [App.jsx](src/App.jsx):
* **Guest Routes** (`/login`, `/signup`): Authenticated users are automatically redirected to `/dashboard`.
* **Protected Routes** (`/dashboard/*`): Unauthenticated guests are automatically redirected to `/login`.
* **Sidebar Logs** ("Exit" button): Clears session state and returns the user to the public homepage (`/home`).

---

## Architectural Layout & Data Flow (Where most things are)

To help you navigate the codebase quickly, here is how the core architecture is wired up:

### 1. The Component / Page Layout Hierarchy
* **Entry Point (`main.jsx`):** Wraps the application inside `<AuthProvider>` and mounts the App.
* **App Wrapper (`App.jsx`):** Sets up the `ThemeProvider` and the main `BrowserRouter`. Defines public layouts, auth layout groupings, and protected dashboard routing structures.
* **Layout Containers:**
  * **Dashboard Layout (`DashboardLayout.jsx`):** Renders the dashboard shell (collapsible sidebar + navigation header + viewport).
  * **Marketing Layout (`MarketingLayout.jsx`):** Wraps public-facing pages (`/home`, `/faq`, `/contact`) inside a `.marketing-theme` styled container.
  * **Auth Layout (`AuthLayout.jsx`):** Wraps login and register pages (`/login`, `/signup`) inside `.marketing-theme`.

### 2. State & Data Persistence Flow
* **Authentication Provider (`AuthContext.jsx`):** Exposes `currentUser`, `isAuthenticated`, `login`, and `logout` helpers app-wide.
* **Data Layer (`mockData.js`):** Exports the raw mock data arrays (e.g. `initialUsers`, `initialOrganisations`).
* **API Wrapper Layer (`api.js`):** Simulates database calls. It writes and reads data to `localStorage` on fetches.
* **Custom Hooks Layer (`src/hooks/`):** React custom hooks (e.g., `useOrganisations.js` at `src/hooks/useOrganisations.js`) wrap the asynchronous calls to `api.js`.
* **UI Views (`pages/`):** Component views consume hook states or context scopes to render statistics, tables, and dashboards.

---

## Key Developer Workflows

### How to Modify Mock Data
All mock datasets are centralized in [src/data/mockData.js](src/data/mockData.js). To add or edit default records, simply append/edit them in:
* `initialUsers` (Users list)
* `initialCourses` (Courses catalog)
* `initialTutors` (Trainer list)
* `initialOrganisations` (Organisations directory)

> [!IMPORTANT]
> **Local Storage Cache Warning:**
> Because the application initializes data inside `localStorage` under keys like `lms_organisations`, **updates to `mockData.js` will not immediately appear** if your browser already has cached data. 
> To see changes, clear your browser cache or run this in the DevTools console:
> ```javascript
> localStorage.clear(); // Or specific keys: localStorage.removeItem('lms_organisations');
> ```
> Then refresh the page.

### How to Integrate a Live Backend (Spring Boot, Node.js, etc.)
The frontend is already configured for asynchronous service calls. All mock API endpoints reside inside [src/services/api.js](src/services/api.js) and [src/context/AuthContext.jsx](src/context/AuthContext.jsx).

To connect to a live REST API:
1. Open [src/services/api.js](src/services/api.js) and replace the local storage operations with real `fetch` or `axios` calls pointing to your backend endpoint (e.g. `http://localhost:8080/api/organisations`).
2. Open [src/context/AuthContext.jsx](src/context/AuthContext.jsx) and swap out the mock login verification with an authentication POST request to verify credentials and store the returned token (e.g. in HttpOnly cookies).

---

## Theme and Design System

The layout relies on a clean, modern **Zinc & Velvet** styling system.

* **Primary Font**: `Inter` (Sans-serif). Configured globally in [src/index.css](src/index.css).
* **Color Custom Variables**: Mapped inside `:root` (Light Mode) and `.dark` (Dark Mode) classes in [src/index.css](src/index.css).
* **Marketing Style Scoping**: The cloned marketing components use CSS module classes styled with custom variables scoped to the `.marketing-theme` wrapper in [src/index.css](src/index.css), preventing style bleeding into the console interface.
* **Theme Synchronization**: Theme switching toggles both the `.dark` class (Tailwind 4 compatibility) and the `data-theme="dark"` attribute on `document.documentElement` to synchronize color tokens app-wide.
* **Design Guidelines**: Refer to [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for full instructions regarding uppercase label letter spacing, heading sizes, and metric dashboard numbers scaling.

---

## Recent Updates

- **Login, Sign Up & Public Marketing Pages Integrated**:
  - Imported Home landing screen, Contact Form, and FAQ page sections.
  - Set up a customized Sign Up registration panel enabling role assignments.
  - Implemented Client-side Route guards restricting `/dashboard` to logged-in users only.
  - Added role-based dashboards switching between Superadmin, Admin, Trainer, and Student consoles with customized statistics, Recharts graphs, and dynamic sidebar options.
- **Organisations Directory Page Added**:
  - The new view lives at `src/pages/Organisations/OrganisationsPage.jsx`.
  - Built a custom hook `useOrganisations.js` at `src/hooks/useOrganisations.js` to manage data fetching and addition state.
  - Linked to `api.js` endpoints (`getOrganisations` and `addOrganisation`) for CRUD simulation.
- **Improved Collapsed Sidebar UI**:
  - Increased the collapsed sidebar width from 80px (`w-20`) to 96px (`w-24`) for a cleaner look.
  - Updated `Logo` component to automatically switch to the Xebia favicon mark (`/XebiaFavicon.png`) when collapsed, keeping the alignment clean and centered.
  - Logo wrapper and inner logo components now correctly adapt to the dark mode sidebar background (`#11050F`), removing the solid white background boxes.



