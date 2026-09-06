# mono.folio

> Clean, high-density, single-screen portfolio builder crafted for modern software engineers.

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01.svg?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

---

## ✨ Features

- **🎯 Single-Screen Viewport Architecture**: High-density 2-column layout designed to fit critical professional context into a single unified viewport without jarring nested scrollbars.
- **🛠️ Interactive Studio Builder (`/builder`)**:
  - Real-time reactive preview synchronized with form edits.
  - Granular character limit validation (`maxLength`) with live monospace counter badges across all fields.
  - Multi-tab editor (Profile, Work Experience, Featured Projects, Articles & Writing).
  - Built-in avatar template switcher (`Builder A` & `Builder B`).
  - Share & publish modal with instant portfolio export and copyable link.
- **📐 Fluid Responsive Design**:
  - Seamless layout adaptation across Desktop (`1440px+`), Tablet (`768px`), and Mobile (`375px–430px`).
  - Adaptive mockups with responsive top chrome address bar and mode switcher.
- **⚡ Modern High-Performance Stack**:
  - [Astro](https://astro.build) for static site generation.
  - [React 19](https://react.dev) for interactive builder components.
  - [Tailwind CSS v4](https://tailwindcss.com) with Vite integration.
  - [Geist Mono & Sans](https://vercel.com/font) typography.
  - [Lucide React](https://lucide.dev) icons.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `20.x` or higher
- npm, pnpm, or bun

### Installation

```bash
# Clone repository
git clone https://github.com/jellybean256/monofolio.git

# Navigate to project directory
cd monofolio

# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

### Production Build

```bash
# Type check and build static site
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
├── public/
│   ├── avatar.png          # Classic signature avatar
│   ├── avatar_girl.png     # Bun & Glasses signature avatar
│   └── favicon.svg         # Favicon
├── src/
│   ├── components/
│   │   ├── landing/        # Hero, VisualProof, LandingFooter
│   │   ├── portfolio/      # PortfolioView, ProfileCard, ProjectsArea, WorkHistory, WritingArea
│   │   └── studio/         # StudioApp, PublishModal, Editor tabs
│   ├── data/
│   │   └── portfolioData.ts# Schemas and default template data
│   ├── layouts/
│   │   └── Layout.astro    # Base HTML layout & meta tags
│   ├── pages/
│   │   ├── index.astro     # Landing page
│   │   ├── builder.astro   # Studio builder page
│   │   └── preview.astro   # Standalone clean portfolio preview
│   └── styles/
│       └── global.css      # Tailwind v4 styles & theme tokens
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## 📄 License

MIT © [jellybean256](https://github.com/jellybean256)
