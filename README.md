# Daksh Goswami — Premium Editorial 3D Developer Portfolio

> **Independently Curious. Constantly Building.**  
> A bespoke, editorial luxury 3D developer portfolio crafted for **Daksh Goswami**, Computer Science Engineering undergraduate at Galgotias University.

---

## ✦ Art Direction & Design Philosophy

This portfolio is art-directed to stand apart from generic developer templates, AI boilerplate, and SaaS landing pages. It embraces an **Editorial Luxury** aesthetic:

- **Typography Mastery**:
  - **Manrope**: Precision geometric body and interface sans-serif.
  - **Instrument Serif**: Editorial display italic accents and typographic statements.
  - **JetBrains Mono**: Technical metadata, code snippets, and section indexing.
- **Palette & Lighting**:
  - Deep black (`#070709`) and charcoal layers (`#121218`).
  - Electric violet (`#8B5CF6`, `#A78BFA`) reserved strictly for intentional accents, subtle rim lighting, and active states.
  - High-contrast soft white typography (`#F5F5F7`).
- **Signature 3D Spatial Experience**:
  - Interactive Three.js sculpture combining a metallic twisted torus knot with an outer gyroscopic wireframe icosahedron cage and subtle orbiting particles.
  - Dual rim lighting (violet key light, cold purple fill light, and specular highlights).
  - Multi-section scroll storytelling: the sculpture moves, scales, and rotates as the visitor traverses through Hero, About, Skills, Work, and Contact.
  - Smooth lerped cursor inertia on desktop; graceful performance optimization for mobile and `prefers-reduced-motion`.

---

## ✦ Technical Architecture

```
daksh-portfolio/
├── index.html                     # Semantic SEO, OG metadata, DG monogram favicon & Google Fonts
├── vite.config.ts                 # Vite bundler configuration with manual vendor chunking
├── tsconfig.json                  # Strict TypeScript configuration
├── package.json                   # Dependencies (React 18, Three.js, Lenis, Lucide, Vite)
├── src/
│   ├── App.tsx                    # Root layout composition & landmarks
│   ├── main.tsx                   # React 18 DOM mount point
│   ├── types/                     # TypeScript declarations
│   ├── data/                      # Centralized Configuration & Data Layer
│   │   ├── personalInfo.ts        # Name, university, bio, editorial statements
│   │   ├── skills.ts              # Categorized skills (C, C++, Python, Web, SQL, Tools)
│   │   ├── projects.ts            # Detailed project data, code snippets & configurable URLs
│   │   ├── education.ts           # Academic foundation & active focus trajectories
│   │   └── socialLinks.ts         # GitHub, LinkedIn, and Email mailto links
│   ├── styles/
│   │   ├── tokens.css             # Colors, typography scale, spacing, transitions
│   │   ├── typography.css         # Fluid clamp typography, serif styling
│   │   └── globals.css            # Base styles, hairline borders, accessibility focus states
│   ├── hooks/
│   │   └── useSmoothScroll.ts     # Lenis smooth inertia scrolling with rAF sync
│   └── components/
│       ├── Scene3D/Scene3D.tsx    # Signature Three.js canvas & scroll choreography
│       ├── CustomCursor/          # Precision cursor with hover state detection
│       ├── ScrollProgress/        # Hairline violet scroll indicator
│       ├── Navbar/Navbar.tsx      # Desktop navigation + responsive mobile drawer
│       ├── Hero/Hero.tsx          # Editorial hero with status indicators and CTA
│       ├── About/About.tsx        # Asymmetrical editorial layout & 3 guiding tenets
│       ├── Skills/Skills.tsx      # Modular categorized capability matrix
│       ├── Projects/Projects.tsx  # Alternating editorial showcase with code preview windows
│       ├── Education/Education.tsx# Academic timeline & university details
│       ├── CurrentFocus/          # Active learning and internship trajectory cards
│       ├── Contact/Contact.tsx    # Direct email channel with copy interaction & socials
│       ├── Footer/Footer.tsx      # Minimal footer with dynamic copyright year & back-to-top
│       ├── TerminalPrompt/        # Interactive floating CLI prompt with custom commands
│       └── Icons/Icons.tsx        # Crisp SVG icons for GitHub and LinkedIn
```

---

## ✦ Getting Started

### 1. Requirements
- Node.js (v18+)
- npm (v9+)

### 2. Local Setup
```bash
# Navigate to the project directory
cd daksh-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Production Build & Preview
```bash
# Compile TypeScript & create optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ✦ How to Customize & Update Data

All content is strictly centralized in `src/data/` so you can update links, projects, and personal information without touching component code:

### 1. Update Social Profiles & Email
Open `src/data/socialLinks.ts`:
- Replace the `url` property for LinkedIn with your profile link (e.g. `https://linkedin.com/in/your-profile`).
- Update the email address in `handle` and `url`.

### 2. Add or Edit Projects
Open `src/data/projects.ts`:
- Add new projects or edit existing ones.
- When you publish repositories on GitHub, fill in `githubUrl: "https://github.com/dakshcodez/your-repo"` to automatically render the "Source Code" button. If left `undefined`, it displays an elegant local development indicator without broken links.

### 3. Update Personal Details & Status
Open `src/data/personalInfo.ts`:
- Update your bio, current internship status, or locations.

---

## ✦ Deployment

### Deploy to Vercel
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Daksh Goswami editorial portfolio"
   git branch -M main
   git remote add origin https://github.com/dakshcodez/portfolio.git
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com).
3. The build settings (`npm run build`, output directory `dist`) are detected automatically.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://netlify.com).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.

---

## ✦ License
Crafted with passion for Daksh Goswami. All rights reserved.
