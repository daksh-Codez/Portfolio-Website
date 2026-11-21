export interface PersonalInfo {
  name: string;
  wordmark: string;
  monogram: string;
  role: string;
  status: string;
  university: string;
  degree: string;
  location: string;
  campusLocation: string;
  tagline: string;
  email?: string;
  heroHeadline: string;
  heroBio: string;
  aboutEditorial: {
    lead: string;
    paragraphs: string[];
    values: { number: string; title: string; description: string }[];
  };
}

export const personalInfo: PersonalInfo = {
  name: "Daksh Goswami",
  wordmark: "DAKSH GOSWAMI",
  monogram: "DG",
  role: "Aspiring Software Developer",
  status: "OPEN TO INTERNSHIP OPPORTUNITIES",
  university: "Galgotias University",
  degree: "Computer Science Engineering",
  location: "Delhi, India",
  campusLocation: "Greater Noida, Uttar Pradesh, India",
  email: "dakshgoswami4077@gmail.com",
  tagline: "INDEPENDENTLY CURIOUS. CONSTANTLY BUILDING.",
  heroHeadline: "Computer Science student exploring the art of building software.",
  heroBio: "I'm a Computer Science Engineering student passionate about programming, software development, and creating useful digital products. I enjoy learning, experimenting, and turning ideas into functional projects.",
  aboutEditorial: {
    lead: "Curiosity is where everything begins.",
    paragraphs: [
      "I'm a Computer Science Engineering student at Galgotias University with a strong interest in programming and software development.",
      "I enjoy understanding how technology works, solving programming problems, and building projects that turn ideas into something functional.",
      "My journey so far has involved learning different programming languages, experimenting with technologies, and developing practical projects.",
      "I'm currently focused on strengthening my fundamentals, building meaningful projects, and gaining real-world experience."
    ],
    values: [
      {
        number: "01",
        title: "First Principles",
        description: "Focusing on core programming fundamentals, structured memory models, and algorithmic thinking before framework hype."
      },
      {
        number: "02",
        title: "Hands-on Craft",
        description: "Writing code daily, building functional CLI tools, and learning through deliberate implementation and refactoring."
      },
      {
        number: "03",
        title: "Continuous Evolution",
        description: "Actively exploring modern development practices, systems architecture, and practical applications of machine intelligence."
      }
    ]
  }
};
