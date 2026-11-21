export interface EducationRecord {
  institution: string;
  degree: string;
  major: string;
  status: string;
  location: string;
  academicNotes: string[];
}

export const educationData: EducationRecord = {
  institution: "Galgotias University",
  degree: "Bachelor of Technology",
  major: "Computer Science Engineering",
  status: "Currently Pursuing (Undergraduate)",
  location: "Greater Noida, Uttar Pradesh, India",
  academicNotes: [
    "Core curriculum focused on algorithms, data structures, and computer architecture",
    "Active self-directed programming and software craftsmanship alongside coursework",
    "Continuous development of procedural and object-oriented paradigms in C and C++"
  ]
};

export type TrajectoryType = 'learning' | 'practice' | 'building' | 'workflow' | 'exploration';

export interface TrajectoryItem {
  number: string;
  title: string;
  phase: string;
  type: TrajectoryType;
  description: string;
  tags: string[];
}

export const trajectoryItems: TrajectoryItem[] = [
  {
    number: "01",
    title: "Programming Fundamentals",
    phase: "LEARNING / FOUNDATIONS",
    type: "learning",
    description: "Strengthening C and C++ through memory concepts, data structures, structured programming, and algorithmic thinking.",
    tags: ["Memory Allocation", "Data Structures", "Structured C", "Algorithmic Thinking"]
  },
  {
    number: "02",
    title: "C++ & Problem-Solving",
    phase: "PRACTICE & CHALLENGES",
    type: "practice",
    description: "Practising algorithmic challenges and exploring modern C++ concepts and STL.",
    tags: ["Algorithmic Practice", "Modern C++", "STL Containers", "Time Complexity"]
  },
  {
    number: "03",
    title: "Practical Software Projects",
    phase: "BUILDING & APPLICATION",
    type: "building",
    description: "Turning programming concepts into useful applications, command-line utilities, and practical software tools.",
    tags: ["CLI Utilities", "File Persistence", "Modular Codebases", "User Experience"]
  },
  {
    number: "04",
    title: "Developer Workflows",
    phase: "WORKFLOW & TOOLING",
    type: "workflow",
    description: "Improving Git, GitHub, version control, documentation, and development practices.",
    tags: ["Git Version Control", "GitHub Workflows", "Documentation", "Commit Discipline"]
  },
  {
    number: "05",
    title: "AI in Software Development",
    phase: "EXPLORATION & EXPERIMENTATION",
    type: "exploration",
    description: "Exploring practical ways artificial intelligence and modern developer tools can support software creation.",
    tags: ["Developer Augmentation", "AI Tooling", "Practical Workflows", "Emerging Tech"]
  }
];

export interface MilestoneGoal {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
}

export const internshipMilestone: MilestoneGoal = {
  eyebrow: "My next milestone.",
  title: "An industry internship.",
  description: "Looking forward to applying my skills, learning from engineering teams, and contributing to real-world projects.",
  badge: "Target Objective"
};

// Legacy compatibility for any lingering imports
export const focusItems = trajectoryItems.map(item => ({
  number: item.number,
  title: item.title,
  description: item.description,
  status: item.type === 'building' ? 'Active Exploration' as const : 'In Progress' as const
}));
