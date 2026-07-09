export const initialCourses = [
  {
    id: 1,
    title: "Enterprise React with Tailwind CSS",
    instructor: "Sarah Jenkins",
    category: "Frontend",
    progress: 75,
    duration: "12h 45m",
    lessons: 24,
    completedLessons: 18,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80",
    visibility: "restricted",
    allowedOrganisations: ["Xebia"]
  },
  {
    id: 2,
    title: "Fullstack Architecture & Design Patterns",
    instructor: "Alex Rivera",
    category: "Architecture",
    progress: 40,
    duration: "18h 30m",
    lessons: 36,
    completedLessons: 14,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
    visibility: "public",
    allowedOrganisations: []
  },
  {
    id: 3,
    title: "Introduction to Cloud Native & Kubernetes",
    instructor: "Michael Chen",
    category: "DevOps",
    progress: 90,
    duration: "8h 15m",
    lessons: 15,
    completedLessons: 13,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80",
    visibility: "restricted",
    allowedOrganisations: ["Google"]
  },
  {
    id: 4,
    title: "Mastering Node.js Microservices",
    instructor: "David Vance",
    category: "Backend",
    progress: 15,
    duration: "20h 10m",
    lessons: 40,
    completedLessons: 6,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    visibility: "restricted",
    allowedOrganisations: ["Microsoft"]
  },
  {
    id: 5,
    title: "UI/UX Design Systems at Scale",
    instructor: "Elena Rostova",
    category: "Design",
    progress: 0,
    duration: "10h 20m",
    lessons: 20,
    completedLessons: 0,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=400&q=80",
    visibility: "public",
    allowedOrganisations: []
  }
];

export const initialTutors = [
  { id: 'T-201', name: 'Sarah Jenkins', dept: 'Frontend', title: 'Principal Frontend Architect', courses: 4, hours: 284, rating: 4.9, status: 'Online', email: 's.jenkins@xebia.com' },
  { id: 'T-202', name: 'Alex Rivera', dept: 'Architecture', title: 'Systems Design Lead', courses: 5, hours: 320, rating: 4.8, status: 'Online', email: 'a.rivera@xebia.com' },
  { id: 'T-203', name: 'Michael Chen', dept: 'DevOps', title: 'DevOps & Infrastructure Specialist', courses: 3, hours: 195, rating: 4.7, status: 'Offline', email: 'm.chen@xebia.com' },
  { id: 'T-204', name: 'Dr. Sarah Miller', dept: 'Management', title: 'Academic Course Director', courses: 2, hours: 148, rating: 4.95, status: 'Online', email: 's.miller@xebia.com' },
  { id: 'T-205', name: 'Apurv Jha', dept: 'Architecture', title: 'Senior Software Authority & Architect', courses: 6, hours: 412, rating: 4.92, status: 'Online', email: 'a.jha@xebia.com' },
  { id: 'T-206', name: 'Marcus MesCaline', dept: 'DevOps', title: 'Cloud Security Lead Instructor', courses: 2, hours: 90, rating: 4.6, status: 'Offline', email: 'm.mescaline@xebia.com' }
];

export const initialDomains = [
  { id: 1,  name: 'React.js',         code: 'REACT',  parentId: null, status: 'Active',   category: 'Frontend'     },
  { id: 2,  name: 'Prometheus',        code: 'E23455', parentId: null, status: 'Active',   category: 'Monitoring'   },
  { id: 3,  name: 'DevOps & Cloud',    code: 'DEVOPS', parentId: null, status: 'Active',   category: 'DevOps'       },
  { id: 4,  name: 'Node.js',           code: 'NODE',   parentId: 1,    status: 'Active',   category: 'Backend'      },
  { id: 5,  name: 'Kubernetes',        code: 'K8S',    parentId: 3,    status: 'Active',   category: 'DevOps'       },
  { id: 6,  name: 'Machine Learning',  code: 'ML101',  parentId: null, status: 'Inactive', category: 'Data Science' },
  { id: 7,  name: 'TypeScript',        code: 'TS',     parentId: 1,    status: 'Active',   category: 'Frontend'     },
  { id: 8,  name: 'GraphQL',           code: 'GQL',    parentId: null, status: 'Active',   category: 'Backend'      },
  { id: 9,  name: 'Docker',            code: 'DOCK',   parentId: 3,    status: 'Active',   category: 'DevOps'       },
  { id: 10, name: 'Python',            code: 'PY3',    parentId: null, status: 'Active',   category: 'Data Science' },
  { id: 11, name: 'Terraform',         code: 'TF',     parentId: 3,    status: 'Active',   category: 'DevOps'       },
  { id: 12, name: 'Deep Learning',     code: 'DL201',  parentId: 6,    status: 'Active',   category: 'Data Science' },
];

export const initialUsers = [
  { id: 1, name: 'Marcus Long', email: 'marcus.long@techcorp.com', role: 'Senior Developer', enrollments: 4, progress: 85, lastLogin: '2 mins ago', status: 'active' },
  { id: 2, name: 'Karla Abbott', email: 'karla.abbott@cloudsystem.com', role: 'DevOps Lead', enrollments: 3, progress: 100, lastLogin: '45 mins ago', status: 'active' },
  { id: 3, name: 'Toby Reynolds', email: 'toby.reynolds@apexdata.com', role: 'Solutions Architect', enrollments: 5, progress: 40, lastLogin: '2 hours ago', status: 'active' },
  { id: 4, name: 'Sarah Jenkins', email: 'sarah.jenkins@webflow.com', role: 'Frontend Engineer', enrollments: 2, progress: 75, lastLogin: '1 day ago', status: 'active' },
  { id: 5, name: 'Alex Rivera', email: 'alex.rivera@codeminded.io', role: 'Backend Engineer', enrollments: 3, progress: 60, lastLogin: '3 days ago', status: 'inactive' },
  { id: 6, name: 'Michael Chen', email: 'michael.chen@cloudbase.org', role: 'Cloud Engineer', enrollments: 4, progress: 90, lastLogin: '4 days ago', status: 'active' },
  { id: 7, name: 'David Vance', email: 'david.vance@architects.net', role: 'Principal Architect', enrollments: 6, progress: 15, lastLogin: '1 week ago', status: 'inactive' }
];


/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Data: mockOrganization
 * Purpose: Provides hardcoded mock data for organisations to simulate
 * a backend API response for the LMS platform.
 */
export const initialOrganisations = [
  {
    id: 1,
    name: "Xebia Software Services",
    domain: "xebia-internal.lms.com",
    plan: "ENTERPRISE",
    seats: 900,
    usedSeats: 812,
    owner: "Apurv Jha",
    mrr: 384000,
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "TechCorp Global",
    domain: "techcorp.lms.com",
    plan: "GROWTH",
    seats: 250,
    usedSeats: 214,
    owner: "Marcus Long",
    mrr: 96400,
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "CloudSystem Inc.",
    domain: "cloudsystem.lms.com",
    plan: "GROWTH",
    seats: 200,
    usedSeats: 180,
    owner: "Karla Abbott",
    mrr: 81200,
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "ApexData Analytics",
    domain: "apexdata.lms.com",
    plan: "STARTER",
    seats: 50,
    usedSeats: 34,
    owner: "Toby Reynolds",
    mrr: 18000,
    status: "TRIAL"
  },
  {
    id: 5,
    name: "Webflow Studios",
    domain: "webflow.lms.com",
    plan: "STARTER",
    seats: 50,
    usedSeats: 22,
    owner: "Sarah Jenkins",
    mrr: 12500,
    status: "TRIAL"
  },
  {
    id: 6,
    name: "CodeMinded",
    domain: "codeminded.lms.com",
    plan: "GROWTH",
    seats: 150,
    usedSeats: 96,
    owner: "Alex Rivera",
    mrr: 54000,
    status: "SUSPENDED"
  },
  {
    id: 7,
    name: "NimbusWorks",
    domain: "nimbusworks.lms.com",
    plan: "ENTERPRISE",
    seats: 700,
    usedSeats: 640,
    owner: "Priya Nair",
    mrr: 288000,
    status: "ACTIVE"
  }
];


/* @ author : Gurnoor Singh
@email: gsingh13_be23@thapar.edu
mobile : +91- 7814205303
Thapar institute of engineering and technology, Patiala
*/

/*
 * Data: Mock Data for modules, permissions ,roles,users 
 * Purpose: Provides hardcoded mock data to simulate backend API
 * responses for the Xebia LMS platform during frontend development.
 * Supports development, testing, UI integration, and feature
 * validation before backend services are available. The mock data
 * includes entities such as roles, permissions, modules, users,
 * organisations, and other domain-specific resources while maintaining
 * a backend-ready structure for seamless future integration.
 */


export const initialModules = [
  { id: 'dashboard', title: 'Dashboard', description: 'System overview and general metrics', route: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'users', title: 'Users', description: 'Manage platform users and roles', route: '/dashboard/users', icon: 'Users' },
  { id: 'organisations', title: 'Organisations', description: 'Manage B2B tenants and plans', route: '/dashboard/organisations', icon: 'Building2' },
  { id: 'domains', title: 'Domains', description: 'Manage learning domains and tracks', route: '/dashboard/domains', icon: 'Layers' },
  { id: 'domain-category', title: 'Domain Category', description: 'Manage domain taxonomy', route: '/dashboard/domain-category', icon: 'Tag' },
  { id: 'courses', title: 'Courses', description: 'Course authoring and catalog', route: '/dashboard/courses', icon: 'BookOpen' },
  { id: 'batches', title: 'Batches', description: 'Cohort and batch management', route: '/dashboard/batches', icon: 'Users2' },
  { id: 'learners', title: 'Learners', description: 'Student directory and progress', route: '/dashboard/learners', icon: 'GraduationCap' },
  { id: 'assessment', title: 'Assessment', description: 'Quizzes and assignments grading', route: '/dashboard/assessment', icon: 'FileText' },
  { id: 'scheduling', title: 'Scheduling', description: 'Timetable and event calendar', route: '/dashboard/scheduling', icon: 'Calendar' },
  { id: 'trainer', title: 'Trainer', description: 'Trainer performance and availability', route: '/dashboard/trainer', icon: 'Presentation' },
  { id: 'administration', title: 'Administration', description: 'System configuration settings', route: '/dashboard/administration', icon: 'Settings' },
  { id: 'parents', title: 'Parents', description: 'Parent portal settings', route: '/dashboard/parents', icon: 'HeartHandshake' },
  { id: 'reports', title: 'Reports', description: 'Generate data and audit reports', route: '/dashboard/reports', icon: 'BarChart3' },
  { id: 'settings', title: 'Settings', description: 'General platform settings', route: '/dashboard/settings', icon: 'Cog' },
];

const allModulesPermissions = initialModules.map(m => ({
  module: m.id,
  permissions: { view: true, create: true, edit: true, delete: true }
}));

const organizerPermissions = initialModules
  .filter(m => ['dashboard', 'learners', 'batches', 'courses'].includes(m.id))
  .map(m => ({
    module: m.id,
    permissions: { view: true, create: false, edit: false, delete: false }
  }));

const trainerPermissions = initialModules
  .filter(m => ['dashboard', 'courses', 'assessment'].includes(m.id))
  .map(m => ({
    module: m.id,
    permissions: { view: true, create: false, edit: false, delete: false }
  }));

const learnerPermissions = initialModules
  .filter(m => ['dashboard', 'courses', 'assessment'].includes(m.id))
  .map(m => ({
    module: m.id,
    permissions: { view: true, create: false, edit: false, delete: false }
  }));

export const initialRoles = [
  {
    id: 'role-1',
    name: 'Super Admin',
    description: 'System administrator with full access to all modules and configurations',
    type: 'System',
    permissions: allModulesPermissions
  },
  {
    id: 'role-2',
    name: 'Admin',
    description: 'Manages batches and tracks learner progress across assigned cohorts',
    type: 'System',
    permissions: organizerPermissions
  },
  {
    id: 'role-3',
    name: 'Trainer',
    description: 'Author courses, conduct assessments, and monitor student performance',
    type: 'System',
    permissions: trainerPermissions
  },
  {
    id: 'role-4',
    name: 'Learner',
    description: 'Access enrolled courses, track progress, and submit assignments',
    type: 'Default',
    permissions: learnerPermissions
  }
];


