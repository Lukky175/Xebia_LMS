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
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=400&q=80"
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
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
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
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=400&q=80"
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
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80"
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
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=400&q=80"
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

