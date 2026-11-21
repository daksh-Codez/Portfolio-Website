-- ========================================================
-- DAKSH GOSWAMI PORTFOLIO - SUPABASE DATABASE SCHEMA
-- PostgreSQL DDL + Row Level Security (RLS) + Seed Data
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. PROJECTS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    language TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT,
    technologies TEXT[] DEFAULT '{}',
    highlights TEXT[] DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    cover_image TEXT,
    screenshots TEXT[] DEFAULT '{}',
    source_file_name TEXT NOT NULL,
    start_line INTEGER DEFAULT 1,
    code_excerpt TEXT NOT NULL,
    visual_accent TEXT DEFAULT '#3B82F6',
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. SKILLS AND TECHNOLOGIES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        '01 / PROGRAMMING & SYSTEMS',
        '02 / WEB FOUNDATIONS',
        '03 / DATABASE',
        '04 / DEVELOPMENT WORKFLOW'
    )),
    icon_name TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. PERSONAL INFORMATION (SINGLETON RECORD ID = 1)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.personal_info (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    tagline TEXT NOT NULL,
    headline TEXT NOT NULL,
    location TEXT NOT NULL,
    bio TEXT NOT NULL,
    about_paragraphs TEXT[] DEFAULT '{}',
    avatar_url TEXT,
    email TEXT NOT NULL,
    availability_status TEXT DEFAULT 'Open to Internship Opportunities',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. EDUCATION (SINGLETON RECORD ID = 1)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.education (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    institution TEXT NOT NULL,
    degree TEXT NOT NULL,
    major TEXT NOT NULL,
    status TEXT NOT NULL,
    location TEXT NOT NULL,
    academic_notes TEXT[] DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 5. TRAJECTORY / CURRENT FOCUS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.trajectory_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    phase TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('learning', 'practice', 'building', 'workflow', 'exploration')),
    description TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 6. INTERNSHIP MILESTONE (SINGLETON RECORD ID = 1)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.internship_milestone (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    eyebrow TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 7. SOCIAL LINKS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.social_links (
    id TEXT PRIMARY KEY, -- e.g., 'github', 'linkedin', 'twitter'
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    handle TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden')),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 8. MEDIA FILES LIBRARY
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 9. WEBSITE SETTINGS
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

-- Enable RLS across all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trajectory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_milestone ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- --------------------------------------------------------
-- PROJECTS POLICIES
-- Public can SELECT published projects only.
-- Authenticated admins have full CRUD.
-- --------------------------------------------------------
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Admin can insert projects"
    ON public.projects FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admin can update projects"
    ON public.projects FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admin can delete projects"
    ON public.projects FOR DELETE
    TO authenticated
    USING (true);

-- --------------------------------------------------------
-- SKILLS POLICIES
-- --------------------------------------------------------
CREATE POLICY "Public can view published skills"
    ON public.skills FOR SELECT
    USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Admin can manage skills"
    ON public.skills FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- --------------------------------------------------------
-- SINGLETON & PUBLIC DATA POLICIES (Read-only public, Admin CRUD)
-- --------------------------------------------------------
CREATE POLICY "Public read personal_info" ON public.personal_info FOR SELECT USING (true);
CREATE POLICY "Admin manage personal_info" ON public.personal_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Admin manage education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public can view published trajectory" ON public.trajectory_items FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Admin manage trajectory" ON public.trajectory_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read internship_milestone" ON public.internship_milestone FOR SELECT USING (true);
CREATE POLICY "Admin manage internship_milestone" ON public.internship_milestone FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read published social_links" ON public.social_links FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Admin manage social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read media_files" ON public.media_files FOR SELECT USING (true);
CREATE POLICY "Admin manage media_files" ON public.media_files FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public read website_settings" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Admin manage website_settings" ON public.website_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ========================================================
-- STORAGE BUCKET CONFIGURATION
-- ========================================================
-- Create 'portfolio-media' public bucket for images/assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies: Public can download, authenticated admin can upload/delete
CREATE POLICY "Public can view portfolio media"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can upload portfolio media"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can update portfolio media"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'portfolio-media');

CREATE POLICY "Admin can delete portfolio media"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'portfolio-media');

-- ========================================================
-- SEED INITIAL DATA FROM EXISTING PORTFOLIO
-- ========================================================

-- Personal Information
INSERT INTO public.personal_info (id, name, role, tagline, headline, location, bio, about_paragraphs, email, availability_status)
VALUES (
    1,
    'Daksh Goswami',
    'Aspiring Software Developer',
    'Computer Science Student · Focused on Systems & Software Craft',
    'Curiosity is where everything begins.',
    'Delhi, India',
    'I am a Computer Science Engineering student focused on programming fundamentals, low-level systems, software craftsmanship, and real-world digital applications.',
    ARRAY[
        'I am a Computer Science Engineering student with an active focus on procedural programming, low-level architecture, and the foundational principles of software development.',
        'My journey is driven by practical curiosity — exploring how instructions translate into execution, how structured algorithms solve complex challenges, and how clean code builds reliable systems.',
        'Currently advancing proficiency in C, C++, and structured problem-solving while exploring how emerging AI technologies can integrate into modern engineering workflows.',
        'Focused on building meaningful software products, contributing to engineering teams through internship opportunities, and pursuing engineering excellence.'
    ],
    'dakshgoswami4077@gmail.com',
    'Open to Internship Opportunities'
)
ON CONFLICT (id) DO NOTHING;

-- Education
INSERT INTO public.education (id, institution, degree, major, status, location, academic_notes)
VALUES (
    1,
    'Galgotias University',
    'Bachelor of Technology',
    'Computer Science Engineering',
    'Currently Pursuing (Undergraduate)',
    'Greater Noida, Uttar Pradesh, India',
    ARRAY[
        'Core curriculum focused on algorithms, data structures, and computer architecture',
        'Active self-directed programming and software craftsmanship alongside coursework',
        'Continuous development of procedural and object-oriented paradigms in C and C++'
    ]
)
ON CONFLICT (id) DO NOTHING;

-- Internship Milestone
INSERT INTO public.internship_milestone (id, eyebrow, title, description, badge)
VALUES (
    1,
    'My next milestone.',
    'An industry internship.',
    'Looking forward to applying my skills, learning from engineering teams, and contributing to real-world projects.',
    'Target Objective'
)
ON CONFLICT (id) DO NOTHING;

-- Social Links
INSERT INTO public.social_links (id, platform, url, handle, display_order, status)
VALUES
    ('github', 'GitHub', 'https://github.com/daksh-Codez', 'daksh-Codez', 1, 'published'),
    ('linkedin', 'LinkedIn', 'https://www.linkedin.com/in/daksh-goswami-52b8262b9', 'Daksh Goswami', 2, 'published')
ON CONFLICT (id) DO NOTHING;

-- Initial Skills & Technologies
INSERT INTO public.skills (name, category, icon_name, display_order, status)
VALUES
    ('C', '01 / PROGRAMMING & SYSTEMS', 'Code2', 1, 'published'),
    ('C++', '01 / PROGRAMMING & SYSTEMS', 'Cpu', 2, 'published'),
    ('Python', '01 / PROGRAMMING & SYSTEMS', 'Terminal', 3, 'published'),
    ('HTML', '02 / WEB FOUNDATIONS', 'Globe', 4, 'published'),
    ('CSS', '02 / WEB FOUNDATIONS', 'Layers', 5, 'published'),
    ('JavaScript', '02 / WEB FOUNDATIONS', 'Code', 6, 'published'),
    ('SQL', '03 / DATABASE', 'Database', 7, 'published'),
    ('Git', '04 / DEVELOPMENT WORKFLOW', 'GitBranch', 8, 'published'),
    ('GitHub', '04 / DEVELOPMENT WORKFLOW', 'Github', 9, 'published'),
    ('Visual Studio Code', '04 / DEVELOPMENT WORKFLOW', 'Monitor', 10, 'published')
ON CONFLICT DO NOTHING;

-- Initial Trajectory Items
INSERT INTO public.trajectory_items (number, title, phase, type, description, tags, display_order, status)
VALUES
    ('01', 'Programming Fundamentals', 'LEARNING / FOUNDATIONS', 'learning', 'Strengthening C and C++ through memory concepts, data structures, structured programming, and algorithmic thinking.', ARRAY['Memory Allocation', 'Data Structures', 'Structured C', 'Algorithmic Thinking'], 1, 'published'),
    ('02', 'C++ & Problem-Solving', 'PRACTICE & CHALLENGES', 'practice', 'Practising algorithmic challenges and exploring modern C++ concepts and STL.', ARRAY['Algorithmic Practice', 'Modern C++', 'STL Containers', 'Time Complexity'], 2, 'published'),
    ('03', 'Practical Software Projects', 'BUILDING & APPLICATION', 'building', 'Turning programming concepts into useful applications, command-line utilities, and practical software tools.', ARRAY['CLI Utilities', 'File Persistence', 'Modular Codebases', 'User Experience'], 3, 'published'),
    ('04', 'Developer Workflows', 'WORKFLOW & TOOLING', 'workflow', 'Improving Git, GitHub, version control, documentation, and development practices.', ARRAY['Git Version Control', 'GitHub Workflows', 'Documentation', 'Commit Discipline'], 4, 'published'),
    ('05', 'AI in Software Development', 'EXPLORATION & EXPERIMENTATION', 'exploration', 'Exploring practical ways artificial intelligence and modern developer tools can support software creation.', ARRAY['Developer Augmentation', 'AI Tooling', 'Practical Workflows', 'Emerging Tech'], 5, 'published')
ON CONFLICT DO NOTHING;

-- Initial Projects
INSERT INTO public.projects (slug, number, title, language, category, short_description, technologies, highlights, source_file_name, start_line, code_excerpt, visual_accent, display_order, status)
VALUES
    (
        'student-management-system',
        '01',
        'Student Management System',
        'C',
        'SYSTEMS & FILE I/O',
        'A console-based student management application built in C, providing structured record manipulation, file persistence, and algorithmic search routines.',
        ARRAY['C', 'File I/O', 'Data Structures', 'Pointers'],
        ARRAY['Custom C struct definitions for student records and metadata', 'Dynamic record manipulation and persistent binary/text file storage', 'Search, update, and deletion algorithms with input bounds validation'],
        'student-management-system.c',
        1,
        '// ========================================================\n// Student Management System in C\n// Persistent File Storage & Student Record Operations\n// ========================================================\n\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\n#define MAX_NAME_LEN 64\n#define MAX_DEPT_LEN 32\n\ntypedef struct {\n    int rollNumber;\n    char name[MAX_NAME_LEN];\n    char department[MAX_DEPT_LEN];\n    float gpa;\n} Student;\n\nvoid addStudentRecord(FILE *fp);\nvoid displayAllRecords(FILE *fp);\nint searchByRollNumber(FILE *fp, int roll);\nvoid updateRecord(FILE *fp, int roll);',
        '#3B82F6',
        1,
        'published'
    ),
    (
        'personal-expense-tracker',
        '02',
        'Personal Expense Tracker',
        'C',
        'FINANCIAL LOGIC & LEDGER',
        'A console-based expense tracking application designed to organize income and expenses, manage transaction records, and display financial summaries.',
        ARRAY['C', 'File Streams', 'Ledger Calculations'],
        ARRAY['Transaction category indexing and ledger calculation', 'Persistent state tracking between console sessions', 'Net balance summaries and category-wise breakdowns'],
        'expense-tracker.c',
        1,
        '// Personal Expense Tracker - Ledger Core\n#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct {\n    int transactionId;\n    char date[12];\n    char category[25];\n    double amount;\n    char type; // ''I'' for Income, ''E'' for Expense\n} Transaction;\n\ndouble computeNetBalance(FILE *ledger);\nvoid filterByCategory(FILE *ledger, const char *cat);',
        '#60A5FA',
        2,
        'published'
    ),
    (
        'number-guessing-game',
        '03',
        'Number Guessing Game',
        'C',
        'LOGIC & PSEUDORANDOM ALGORITHMS',
        'A console-based guessing game featuring difficulty levels, random number generation, and limited attempts.',
        ARRAY['C', 'Algorithms', 'Pseudorandom RNG'],
        ARRAY['Seeded pseudorandom number generation with srand()', 'Binary search feedback loop (High / Low / Correct)', 'Dynamic difficulty modifiers and attempt counter state'],
        'number-guessing-game.c',
        1,
        '// Number Guessing Game Logic\n#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint runGameRound(int maxRange, int maxAttempts) {\n    srand((unsigned int)time(NULL));\n    int target = (rand() % maxRange) + 1;\n    int guess, attempts = 0;\n\n    while (attempts < maxAttempts) {\n        printf("Enter guess (1-%d): ", maxRange);\n        if (scanf("%d", &guess) != 1) break;\n        attempts++;\n        if (guess == target) return attempts;\n        printf(guess < target ? "Too low!\\n" : "Too high!\\n");\n    }\n    return -1;\n}',
        '#38BDF8',
        3,
        'published'
    ),
    (
        'c-calculator',
        '04',
        'Basic Calculator in C',
        'C',
        'CONTROL FLOW & OPERATOR DISPATCH',
        'A command-line calculator that performs arithmetic operations using conditional logic and user input.',
        ARRAY['C', 'Control Flow', 'Floating-point Math'],
        ARRAY['Clean switch-case operator dispatcher with error bounds', 'Division-by-zero validation and safe input buffering', 'Iterative computation loop for continuous operations'],
        'calculator.c',
        1,
        '// Basic Arithmetic Calculator in C\n#include <stdio.h>\n\ndouble evaluate(double a, char op, double b, int *status) {\n    *status = 0;\n    switch (op) {\n        case ''+'': return a + b;\n        case ''-'': return a - b;\n        case ''*'': return a * b;\n        case ''/'':\n            if (b == 0.0) { *status = -1; return 0; }\n            return a / b;\n        default:\n            *status = -2;\n            return 0;\n    }\n}',
        '#3B82F6',
        4,
        'published'
    ),
    (
        'cpp-calculator',
        '05',
        'Basic Calculator in C++',
        'C++',
        'OBJECT-ORIENTED BASICS',
        'A beginner-friendly calculator application developed in C++ to practice programming fundamentals and arithmetic operations.',
        ARRAY['C++', 'OOP', 'I/O Streams'],
        ARRAY['Introduction to class-encapsulated mathematical operations', 'I/O stream formatting with standard std::cin and std::cout', 'Structured validation and clean method separation'],
        'calculator.cpp',
        1,
        '#include <iostream>\n\nclass Calculator {\npublic:\n    double calculate(double num1, char op, double num2) {\n        switch (op) {\n            case ''+'': return num1 + num2;\n            case ''-'': return num1 - num2;\n            case ''*'': return num1 * num2;\n            case ''/'':\n                if (num2 == 0) throw std::invalid_argument("Division by zero");\n                return num1 / num2;\n            default:\n                throw std::invalid_argument("Unsupported operator");\n        }\n    }\n};',
        '#60A5FA',
        5,
        'published'
    ),
    (
        'cpp-fundamentals-suite',
        '06',
        'Basic Programs in C++',
        'C++',
        'ALGORITHMIC FOUNDATIONS',
        'A growing collection of beginner-level C++ programs created to practice programming concepts and strengthen problem-solving fundamentals.',
        ARRAY['C++', 'Data Structures', 'Algorithms'],
        ARRAY['Arrays, strings, iteration loops, and nested control flow', 'Function modularity, recursion basics, and pointer mechanics', 'Problem-solving practice targeting foundational algorithms'],
        'fundamentals.cpp',
        1,
        '#include <iostream>\n#include <vector>\n\ntemplate <typename T>\nvoid printArray(const std::vector<T>& list) {\n    for (const auto& item : list) {\n        std::cout << item << " ";\n    }\n    std::cout << "\\n";\n}',
        '#38BDF8',
        6,
        'published'
    )
ON CONFLICT (slug) DO NOTHING;

-- Initial Website Settings
INSERT INTO public.website_settings (key, value)
VALUES
    ('site_meta', '{"siteTitle": "Daksh Goswami — Aspiring Software Developer", "maintenanceMode": false, "contactEmail": "dakshgoswami4077@gmail.com"}'::jsonb),
    ('feature_flags', '{"enableTerminal": true, "enable3DScene": true, "enableAmbientLight": true}'::jsonb)
ON CONFLICT (key) DO NOTHING;
