export interface Project {
  id: string;
  number: string;
  title: string;
  language: string;
  category: string;
  description: string;
  highlights: string[];
  githubUrl?: string; // Configurable; if undefined, link won't render broken
  visualConcept: {
    accentColor: string;
    diagramType: 'data-struct' | 'arithmetic' | 'binary-search' | 'ledger' | 'oop-class' | 'syntax-tree';
    snippet: string;
  };
}

export const projects: Project[] = [
  {
    id: "student-management-system",
    number: "01",
    title: "Student Management System",
    language: "C",
    category: "SYSTEMS & FILE I/O",
    description: "A console-based student management application built using C, demonstrating fundamental programming concepts and structured data management.",
    highlights: [
      "Custom C struct definitions for student records",
      "Dynamic record manipulation and persistent file storage",
      "Formatted console outputs with search and update algorithms"
    ],
    // Replace with your GitHub repository URL when published (e.g., "https://github.com/dakshgoswami/student-management-system")
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#8B5CF6",
      diagramType: "data-struct",
      snippet: `typedef struct {\n  int id;\n  char name[50];\n  float gpa;\n  char department[30];\n} Student;\n\nvoid insertRecord(Student s);`
    }
  },
  {
    id: "personal-expense-tracker",
    number: "02",
    title: "Personal Expense Tracker",
    language: "C",
    category: "FINANCIAL LOGIC & LEDGER",
    description: "A console-based expense tracking application designed to organize income and expenses, manage transaction records, and display financial summaries.",
    highlights: [
      "Transaction category indexing and ledger calculation",
      "Persistent state tracking between console sessions",
      "Net balance summaries and category-wise breakdowns"
    ],
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#A78BFA",
      diagramType: "ledger",
      snippet: `typedef struct {\n  char date[12];\n  char category[25];\n  double amount;\n  char type; // 'I' or 'E'\n} Transaction;\n\ndouble computeNetBalance();`
    }
  },
  {
    id: "number-guessing-game",
    number: "03",
    title: "Number Guessing Game",
    language: "C",
    category: "LOGIC & PSEUDORANDOM ALGORITHMS",
    description: "A console-based guessing game featuring difficulty levels, random number generation, and limited attempts.",
    highlights: [
      "Seeded pseudorandom number generation with srand()",
      "Binary search feedback loop (High / Low / Correct)",
      "Dynamic difficulty modifiers and attempt counter state"
    ],
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#C084FC",
      diagramType: "binary-search",
      snippet: `int target = (rand() % maxRange) + 1;\nwhile (attemptsLeft > 0) {\n  scanf("%d", &guess);\n  if (guess == target) return WON;\n  printf(guess < target ? "Too low\\n" : "Too high\\n");\n}`
    }
  },
  {
    id: "c-calculator",
    number: "04",
    title: "Basic Calculator in C",
    language: "C",
    category: "CONTROL FLOW & OPERATOR DISPATCH",
    description: "A command-line calculator that performs arithmetic operations using conditional logic and user input.",
    highlights: [
      "Clean switch-case operator dispatcher with error bounds",
      "Division-by-zero validation and safe input buffering",
      "Iterative computation loop for continuous operations"
    ],
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#8B5CF6",
      diagramType: "arithmetic",
      snippet: `switch (op) {\n  case '+': result = a + b; break;\n  case '-': result = a - b; break;\n  case '*': result = a * b; break;\n  case '/': (b != 0) ? (result = a / b) : error(); break;\n}`
    }
  },
  {
    id: "cpp-calculator",
    number: "05",
    title: "Basic Calculator in C++",
    language: "C++",
    category: "OBJECT-ORIENTED BASICS",
    description: "A beginner-friendly calculator application developed in C++ to practice programming fundamentals and arithmetic operations.",
    highlights: [
      "Introduction to class-encapsulated mathematical operations",
      "I/O stream formatting with standard std::cin and std::cout",
      "Structured validation and clean method separation"
    ],
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#A78BFA",
      diagramType: "oop-class",
      snippet: `class Calculator {\npublic:\n  double compute(double a, char op, double b);\nprivate:\n  bool validate(char op, double b);\n};`
    }
  },
  {
    id: "cpp-fundamentals-suite",
    number: "06",
    title: "Basic Programs in C++",
    language: "C++",
    category: "ALGORITHMIC FOUNDATIONS",
    description: "A growing collection of beginner-level C++ programs created to practice programming concepts and strengthen problem-solving fundamentals.",
    highlights: [
      "Arrays, strings, iteration loops, and nested control flow",
      "Function modularity, recursion basics, and pointer mechanics",
      "Problem-solving practice targeting foundational algorithms"
    ],
    githubUrl: undefined,
    visualConcept: {
      accentColor: "#C084FC",
      diagramType: "syntax-tree",
      snippet: `// Exploring foundational paradigms\ntemplate <typename T>\nvoid demonstrateAlgorithms(const std::vector<T>& data) {\n  // Problem-solving exercises & practice\n}`
    }
  }
];
