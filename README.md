# A Personalized Portfolio Website

> **Independently Curious. Constantly Building.**  
> A bespoke, editorial luxury 3D developer portfolio crafted for **Daksh Goswami**, Computer Science Engineering undergraduate at Galgotias University, equipped with a private administration dashboard (CMS) powered by Supabase.

---

## ✦ Art Direction & Design Philosophy

This portfolio is art-directed to stand apart from generic developer templates, AI boilerplate, and SaaS landing pages. It embraces an **Editorial Luxury** aesthetic:

- **Typography Mastery**:
  - **Manrope**: Precision geometric body and interface sans-serif.
  - **Instrument Serif**: Editorial display italic accents and typographic statements.
  - **JetBrains Mono**: Technical metadata, code snippets, and section indexing.
- **Palette & Lighting**:
  - Deep obsidian pitch black (`#040407`) and dark surface layers (`#08080C`, `#101016`).
  - Electric cobalt/azure blue (`#3B82F6`, `#60A5FA`) reserved for intentional accents, rim lighting, and active states.
  - High-contrast readable typography (`#F2EFF5`).
- **Signature 3D Spatial Experience**:
  - Interactive Three.js sculpture combining a metallic twisted torus knot with an outer gyroscopic wireframe icosahedron cage and subtle orbiting particles.
  - Dual rim lighting (blue key light, cold fill light, and specular highlights that respond dynamically to cursor position).
  - Multi-section scroll storytelling: the sculpture moves, scales, and rotates as the visitor traverses through Hero, About, Skills, Work, and Contact.
  - Subtle mouse parallax tilt and performance optimization that pauses rendering when the browser tab is hidden.
- **Ambient Light Reflection**:
  - Subtle radial luxury glow tracking the cursor with soft damping, disabled on touch and reduced-motion devices.

---

## ✦ Private Admin Dashboard (CMS)

A dedicated, private Content Management System accessible at:

```
/admin
```

### Features:
1. **Overview Dashboard**: Live statistics for total projects, published projects, drafts, technologies, and recent updates.
2. **Projects Manager**: Full CRUD, reordering, draft/published toggling, syntax-highlighted code excerpt preview, and GitHub URL linkage.
3. **Media Library**: Direct upload to persistent Supabase Storage (`portfolio-media` bucket) with public link copying and deletion guards.
4. **Skills & Technologies**: Categorized technical capability management (Programming & Systems, Web Foundations, Database, Workflow).
5. **About Me & Identity**: Full editorial statement and biographical narrative paragraph editing.
6. **Education & Degree**: Academic credentials, status, and craft highlights.
7. **Trajectory & Focus**: Sequential milestone management (01 to 05) and target internship objective.
8. **Social Links**: Live links for GitHub, LinkedIn, and professional contact channels.
9. **Website Settings**: Feature toggles (Three.js 3D canvas, Terminal CLI, Ambient Light) and connection diagnostics.

---

## ✦ Supabase Backend Configuration Guide

The portfolio uses **Supabase** for Authentication, PostgreSQL Database, Storage, and Row Level Security (RLS).

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project** and name it `daksh-portfolio`.
3. Choose a strong database password and select a region close to your target audience (e.g. `ap-south-1` Mumbai or `ap-southeast-1` Singapore).

### 2. Apply Database Migration & Schema
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Open the file `supabase/schema.sql` from this repository.
3. Copy its entire contents, paste it into the Supabase SQL Editor, and click **Run**.
4. This will automatically:
   - Create all 9 database tables (`projects`, `skills`, `personal_info`, `education`, `trajectory_items`, `internship_milestone`, `social_links`, `media_files`, `website_settings`).
   - Enable Row Level Security (RLS) policies ensuring public visitors only read published content.
   - Create the `portfolio-media` public storage bucket for image uploads.
   - Seed the database with all your existing portfolio data.

### 3. Create the Administrator Account
To ensure no public registration is possible, create your admin user directly in Supabase:
1. In Supabase Dashboard, navigate to **Authentication -> Users**.
2. Click **Add User -> Create User**.
3. Enter your administrator email (e.g. `dakshgoswami4077@gmail.com`) and a strong password.
4. Toggle **Auto Confirm User?** to `ON` so you can sign in immediately without email confirmation.
5. Click **Create User**.

### 4. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your Supabase credentials:

```ini
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Security Note**: Never expose the `service_role` secret key in client-side code. Only the `anon` public key is needed.

---

## ✦ Local Development & Build

### 1. Requirements
- Node.js (v18+)
- npm (v9+)

### 2. Run Locally
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit:
- Public portfolio: `http://localhost:3000/`
- Admin dashboard: `http://localhost:3000/admin`
- Admin login: `http://localhost:3000/admin/login`

### 3. Production Build
```bash
# Compile TypeScript and bundle production assets
npm run build

# Preview build locally
npm run preview -- --port 3000
```

---

## ✦ Deployment (Vercel)

1. Push your repository to GitHub.
2. In [Vercel](https://vercel.com), import your repository.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Public Anon Key
4. Deploy! Because client-side routing is used for `/admin`, ensure single-page app rewrites are enabled. A `vercel.json` rewrite is included below.

### Vercel SPA Routing Configuration (`vercel.json`)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## ✦ License
Crafted with passion for Daksh Goswami. All rights reserved.
