# Xebia LMS Platform Console

Welcome to the **Xebia LMS** frontend codebase! This repository is built with **React**, **Vite**, **Tailwind CSS v4**, and **React Router v6**. It is structured to support multi-developer workflows, local data persistence, and an easy transition to a live backend.

---

## 🚀 Quick Start & Onboarding

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

## 📁 Repository Directory Structure

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

## 🔍 UI Element & File Reference Map

If you want to customize specific layout elements or feature pages, use this quick map to find their source code:

### Layout Elements

| UI Element | What it does | File to Edit |
| :--- | :--- | :--- |
| **Sidebar Links & Sections** | Add, remove, or change sidebar navigation items, section headers, icons, and logo branding labels. | [Sidebar.jsx](src/components/layout/Sidebar.jsx) |
| **Logo Icon & Container** | Change the main branding logo element or its padding. | [Logo.jsx](src/components/ui/Logo.jsx) |
| **Top Navbar & Breadcrumbs** | Modify header search bar, notify bell, profile cards, and path-to-title breadcrumbs categories mapping. | [Navbar.jsx](src/components/layout/Navbar.jsx) |
| **General Page Frame** | Adjust the flex wrapper that controls the grid positioning of Sidebar, Navbar, and `<main>` viewport scroll dimensions. | [DashboardLayout.jsx](src/components/layout/DashboardLayout.jsx) |
| **Active Sub-Routes** | Configure navigation path patterns inside the React Router `<Routes>` module. | [Dashboard.jsx](src/pages/Dashboard/Dashboard.jsx) |

### Page Views

| Feature Page | Navigates to | Active Component / File |
| :--- | :--- | :--- |
| **Dashboard Home** | `/dashboard` | [DashboardHome.jsx](src/pages/Dashboard/DashboardHome.jsx) |
| **Users Directory** | `/dashboard/users` | [UsersPage.jsx](src/pages/Users/UsersPage.jsx) |
| **Courses Catalog** | `/dashboard/courses` | [CoursesPage.jsx](src/pages/Courses/CoursesPage.jsx) |
| **Trainer Dashboard** | `/dashboard/trainer` | [TutorsPage.jsx](src/pages/Tutors/TutorsPage.jsx) |
| **Finance Center** | `/dashboard/finance` | [RevenuePage.jsx](src/pages/Revenue/RevenuePage.jsx) |
| **Administration Panel** | `/dashboard/administration` | [SettingsPage.jsx](src/pages/Settings/SettingsPage.jsx) |
| **Other modules** | `/dashboard/*` | Displays `BlankPage` component declared in [Dashboard.jsx](src/pages/Dashboard/Dashboard.jsx) |

### Styling, Animations & Glows

| Styling Element | Description | File to Edit |
| :--- | :--- | :--- |
| **Colors, Fonts & Theme** | Declare and override typography, slate/zinc variables, and custom theme variables. | [index.css](src/index.css) |
| **Interactive Glow Card** | Modify the physics, cursor edge-detection, or border gradients of cards. | [BorderGlow.jsx](src/components/ui/BorderGlow.jsx) & [BorderGlow.css](src/components/ui/BorderGlow.css) |
| **Count Up Text** | Controls number format mappings (used for bento grid metrics). | [CountUp.jsx](src/components/ui/CountUp.jsx) |

---

## 🛠️ Key Developer Workflows

### How to Modify Mock Data
All mock datasets are centralized in [src/data/mockData.js](src/data/mockData.js). To add new users, mock courses, or faculty records, simply append them to:
* `initialUsers` (Users page dataset)
* `initialCourses` (Courses page dataset)
* `initialTutors` (Trainer page dataset)

*Note: On first load, the app writes these arrays to the browser's `localStorage`. If you update `mockData.js` and don't see changes in the browser, clear your browser's local storage or inspect under developer tools.*

### How to Integrate a Live Backend (Spring Boot, Node.js, etc.)
The frontend is already configured for asynchronous service calls. All mock API endpoints reside inside [src/services/api.js](src/services/api.js).

To connect to a live REST API:
1. Open [src/services/api.js](src/services/api.js).
2. Replace the local storage mock promises with `fetch` or `axios` calls pointing to your backend endpoint (e.g. `http://localhost:8080/api/tutors`).
3. You **do not** need to change any logic inside page files like `TutorsPage.jsx` or `UsersPage.jsx` since they already asynchronously await promises and show progress spinners during fetching!

---

## 🎨 Theme and Design System

The layout relies on a clean, modern **Zinc & Velvet** styling system.

* **Primary Font**: `Inter` (Sans-serif). Configured globally in [src/index.css](src/index.css).
* **Color Custom Variables**: Mapped inside `:root` (Light Mode) and `.dark` (Dark Mode) classes in [src/index.css](src/index.css). 
* **Design Guidelines**: Refer to [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for full instructions regarding uppercase label letter spacing, heading sizes, and metric dashboard numbers scaling.
