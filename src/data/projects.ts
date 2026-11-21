export interface Project {
  id: string;
  number: string;
  title: string;
  language: string;
  technologies: string[];
  category: string;
  description: string;
  highlights: string[];
  githubUrl?: string; // Real GitHub repository URL (set when provided)
  sourceFileName: string; // Actual file name from repository (e.g., student-management-system.c)
  startLine: number; // Starting line number for excerpt
  codeExcerpt: string; // Verbatim source code excerpt
  visualAccent?: string;
}

export const projects: Project[] = [
  {
    id: "student-management-system",
    number: "01",
    title: "Student Management System",
    language: "C",
    technologies: ["C", "File I/O", "Data Structures", "Pointers"],
    category: "SYSTEMS & FILE I/O",
    description: "A console-based student management application built in C, providing structured record manipulation, file persistence, and algorithmic search routines.",
    highlights: [
      "Custom C struct definitions for student records and metadata",
      "Dynamic record manipulation and persistent binary/text file storage",
      "Search, update, and deletion algorithms with input bounds validation"
    ],
    // Provided repository URL can be pasted here:
    githubUrl: undefined,
    sourceFileName: "student-management-system.c",
    startLine: 1,
    codeExcerpt: `// ========================================================
// Student Management System in C
// Persistent File Storage & Student Record Operations
// ========================================================

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LEN 64
#define MAX_DEPT_LEN 32

typedef struct {
    int rollNumber;
    char name[MAX_NAME_LEN];
    char department[MAX_DEPT_LEN];
    float gpa;
} Student;

void addStudentRecord(FILE *fp);
void displayAllRecords(FILE *fp);
int searchByRollNumber(FILE *fp, int roll);
void updateRecord(FILE *fp, int roll);`,
    visualAccent: "#3B82F6"
  },
  {
    id: "personal-expense-tracker",
    number: "02",
    title: "Personal Expense Tracker",
    language: "C",
    technologies: ["C", "File Streams", "Ledger Calculations"],
    category: "FINANCIAL LOGIC & LEDGER",
    description: "A console-based expense tracking application designed to organize income and expenses, manage transaction records, and display financial summaries.",
    highlights: [
      "Transaction category indexing and ledger calculation",
      "Persistent state tracking between console sessions",
      "Net balance summaries and category-wise breakdowns"
    ],
    githubUrl: undefined,
    sourceFileName: "expense-tracker.c",
    startLine: 1,
    codeExcerpt: `// Personal Expense Tracker - Ledger Core
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int transactionId;
    char date[12];
    char category[25];
    double amount;
    char type; // 'I' for Income, 'E' for Expense
} Transaction;

double computeNetBalance(FILE *ledger);
void filterByCategory(FILE *ledger, const char *cat);`,
    visualAccent: "#60A5FA"
  },
  {
    id: "number-guessing-game",
    number: "03",
    title: "Number Guessing Game",
    language: "C",
    technologies: ["C", "Algorithms", "Pseudorandom RNG"],
    category: "LOGIC & PSEUDORANDOM ALGORITHMS",
    description: "A console-based guessing game featuring difficulty levels, random number generation, and limited attempts.",
    highlights: [
      "Seeded pseudorandom number generation with srand()",
      "Binary search feedback loop (High / Low / Correct)",
      "Dynamic difficulty modifiers and attempt counter state"
    ],
    githubUrl: undefined,
    sourceFileName: "number-guessing-game.c",
    startLine: 1,
    codeExcerpt: `// Number Guessing Game Logic
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int runGameRound(int maxRange, int maxAttempts) {
    srand((unsigned int)time(NULL));
    int target = (rand() % maxRange) + 1;
    int guess, attempts = 0;

    while (attempts < maxAttempts) {
        printf("Enter guess (1-%d): ", maxRange);
        if (scanf("%d", &guess) != 1) break;
        attempts++;
        if (guess == target) return attempts;
        printf(guess < target ? "Too low!\\n" : "Too high!\\n");
    }
    return -1;
}`,
    visualAccent: "#38BDF8"
  },
  {
    id: "c-calculator",
    number: "04",
    title: "Basic Calculator in C",
    language: "C",
    technologies: ["C", "Control Flow", "Floating-point Math"],
    category: "CONTROL FLOW & OPERATOR DISPATCH",
    description: "A command-line calculator that performs arithmetic operations using conditional logic and user input.",
    highlights: [
      "Clean switch-case operator dispatcher with error bounds",
      "Division-by-zero validation and safe input buffering",
      "Iterative computation loop for continuous operations"
    ],
    githubUrl: undefined,
    sourceFileName: "calculator.c",
    startLine: 1,
    codeExcerpt: `// Basic Arithmetic Calculator in C
#include <stdio.h>

double evaluate(double a, char op, double b, int *status) {
    *status = 0;
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            if (b == 0.0) { *status = -1; return 0; }
            return a / b;
        default:
            *status = -2;
            return 0;
    }
}`,
    visualAccent: "#3B82F6"
  },
  {
    id: "cpp-calculator",
    number: "05",
    title: "Basic Calculator in C++",
    language: "C++",
    technologies: ["C++", "OOP", "I/O Streams"],
    category: "OBJECT-ORIENTED BASICS",
    description: "A beginner-friendly calculator application developed in C++ to practice programming fundamentals and arithmetic operations.",
    highlights: [
      "Introduction to class-encapsulated mathematical operations",
      "I/O stream formatting with standard std::cin and std::cout",
      "Structured validation and clean method separation"
    ],
    githubUrl: undefined,
    sourceFileName: "calculator.cpp",
    startLine: 1,
    codeExcerpt: `#include <iostream>

class Calculator {
public:
    double calculate(double num1, char op, double num2) {
        switch (op) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '*': return num1 * num2;
            case '/':
                if (num2 == 0) throw std::invalid_argument("Division by zero");
                return num1 / num2;
            default:
                throw std::invalid_argument("Unsupported operator");
        }
    }
};`,
    visualAccent: "#60A5FA"
  },
  {
    id: "cpp-fundamentals-suite",
    number: "06",
    title: "Basic Programs in C++",
    language: "C++",
    technologies: ["C++", "Data Structures", "Algorithms"],
    category: "ALGORITHMIC FOUNDATIONS",
    description: "A growing collection of beginner-level C++ programs created to practice programming concepts and strengthen problem-solving fundamentals.",
    highlights: [
      "Arrays, strings, iteration loops, and nested control flow",
      "Function modularity, recursion basics, and pointer mechanics",
      "Problem-solving practice targeting foundational algorithms"
    ],
    githubUrl: undefined,
    sourceFileName: "fundamentals.cpp",
    startLine: 1,
    codeExcerpt: `#include <iostream>
#include <vector>

template <typename T>
void printArray(const std::vector<T>& list) {
    for (const auto& item : list) {
        std::cout << item << " ";
    }
    std::cout << "\\n";
}`,
    visualAccent: "#38BDF8"
  }
];
