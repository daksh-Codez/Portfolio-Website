export interface SkillItem {
  name: string;
  category: 'core' | 'web' | 'data' | 'tool';
  note?: string;
  tag?: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  index: string;
  summary: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    category: "PROGRAMMING & SYSTEMS",
    index: "01",
    summary: "Strong focus on structured logic, procedural patterns, and object-oriented foundations.",
    skills: [
      { name: "C", category: "core", tag: "Procedural / Memory / Low-level" },
      { name: "C++", category: "core", tag: "OOP / Algorithms / Systems" },
      { name: "Python", category: "core", tag: "Scripting / Problem Solving / AI Tools" }
    ]
  },
  {
    id: "web",
    category: "WEB FOUNDATIONS",
    index: "02",
    summary: "Fundamental understanding of semantic markup, styling architecture, and DOM scripting.",
    skills: [
      { name: "HTML", category: "web", tag: "Semantic markup & structure" },
      { name: "CSS", category: "web", tag: "Modern layout, Flexbox, Grid, Responsive" },
      { name: "JavaScript", category: "web", tag: "ES6+, DOM manipulation & async logic" }
    ]
  },
  {
    id: "database",
    category: "DATABASE",
    index: "03",
    summary: "Relational database concepts, schema querying, and data structuring.",
    skills: [
      { name: "SQL", category: "data", tag: "Relational queries, joins & schema design" }
    ]
  },
  {
    id: "tools",
    category: "DEVELOPMENT WORKFLOW",
    index: "04",
    summary: "Modern developer environment, version control pipelines, and collaborative workflows.",
    skills: [
      { name: "Git", category: "tool", tag: "Branching, committing & history" },
      { name: "GitHub", category: "tool", tag: "Remote repos, open source & workflows" },
      { name: "Visual Studio Code", category: "tool", tag: "Primary development IDE & extensions" }
    ]
  }
];
