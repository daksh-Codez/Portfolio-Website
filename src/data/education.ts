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

export interface FocusItem {
  number: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Active Exploration' | 'Target Objective';
}

export const focusItems: FocusItem[] = [
  {
    number: "01",
    title: "Strengthening Programming Fundamentals",
    description: "Deepening mastery over memory structures, algorithmic complexity, and structured execution in C and C++.",
    status: "In Progress"
  },
  {
    number: "02",
    title: "Improving C++ & Problem-Solving",
    description: "Solving algorithmic challenges and understanding modern C++ idiom patterns and efficient STL utilization.",
    status: "In Progress"
  },
  {
    number: "03",
    title: "Building Practical Software Projects",
    description: "Translating concepts into useful command-line utilities, structured systems, and reliable user tools.",
    status: "Active Exploration"
  },
  {
    number: "04",
    title: "Modern Development Workflows",
    description: "Refining Git version control strategies, semantic code documentation, and automated CLI workflows.",
    status: "Active Exploration"
  },
  {
    number: "05",
    title: "Software Engineering & AI Applications",
    description: "Exploring how modern artificial intelligence and developer tools integrate practically into software creation.",
    status: "Active Exploration"
  },
  {
    number: "06",
    title: "Internship Opportunities",
    description: "Actively seeking industry internships to contribute to real-world engineering teams and accelerate professional growth.",
    status: "Target Objective"
  }
];
