// ─── Central Portfolio Data ───────────────────────────────────────────────────
// Single source of truth for the entire portfolio.
// Edit this file to update content across all sections dynamically.
// ──────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  title: string;
  filename: string;
  tagline: string;
  description: string;
  stack: string[];
  architecture?: Partial<
    Record<
      | "frontend"
      | "backend"
      | "database"
      | "authentication"
      | "ai"
      | "storage"
      | "infrastructure",
      string[]
    >
  >;
  dependencies?: Array<{
    name: string;
    category:
      | "runtime"
      | "framework"
      | "ui"
      | "state"
      | "database"
      | "auth"
      | "tooling"
      | "graphics";
    detail?: string;
  }>;
  repo?: string;
  demo?: string;
  status: "live" | "working" | "soon";
  featured?: boolean;
};

export type ProjectCategory = {
  id: string;
  label: string;
  projects: Project[];
};

export interface SkillCategory {
  title: string;
  iconName: "LayoutTemplate" | "Database" | "Braces" | "GitBranch";
  description: string;
  skills: string[];
  pointerColor: string;
}

// ─── Project Categories ──────────────────────────────────────────────────────

const projectCategories: ProjectCategory[] = [
  {
    id: "featured",
    label: "featured",
    projects: [
      {
        id: "portfolio-website",
        title: "Portfolio Website",
        filename: "portfolio.tsx",
        tagline: "React · Three.js · Framer Motion",
        description:
          "A responsive developer portfolio built with React, TypeScript, Tailwind CSS, Framer Motion, and a Three.js hero scene. Includes performance-aware 3D rendering that respects prefers-reduced-motion, network quality, and viewport width.",
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Three.js",
          "Framer Motion",
          "Shadcn UI",
          "React Three Fiber",
        ],
        architecture: {
          frontend: ["React", "TypeScript", "Vite", "Tailwind CSS"],
          ai: [],
          storage: [],
          infrastructure: ["Vercel", "GitHub Pages", "GitHub API"],
        },
        dependencies: [
          { name: "react", category: "framework", detail: "UI runtime" },
          { name: "typescript", category: "runtime", detail: "Typed source" },
          { name: "vite", category: "tooling", detail: "Build and dev server" },
          { name: "tailwindcss", category: "ui", detail: "Styling system" },
          { name: "framer-motion", category: "ui", detail: "Motion system" },
          { name: "three", category: "graphics", detail: "3D scene rendering" },
        ],
        repo: "https://github.com/HetulMistry/HetulMistry.github.io",
        demo: "https://HetulMistry.tech/",
        status: "live",
        featured: true,
      },
      {
        id: "subscription-tracker",
        title: "Subscription Tracker",
        filename: "subscription-tracker.tsx",
        tagline: "Express · PostgreSQL · Redis · JWT",
        description:
          "Backend-focused subscription management with full CRUD flows, JWT authentication, Redis-based rate limiting, Prisma ORM, Swagger API docs, and QR code generation for subscription sharing.",
        stack: [
          "Express",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "JWT",
          "Rate Limiting",
          "Swagger",
          "QR Code",
          "Zod",
        ],
        architecture: {
          frontend: ["Express server-rendered API surface"],
          backend: ["Express", "Prisma", "JWT"],
          database: ["PostgreSQL"],
          authentication: ["JWT"],
          infrastructure: ["Redis", "Swagger"],
        },
        dependencies: [
          { name: "express", category: "framework", detail: "API server" },
          {
            name: "prisma",
            category: "database",
            detail: "ORM and schema access",
          },
          {
            name: "postgresql",
            category: "database",
            detail: "Primary data store",
          },
          { name: "redis", category: "database", detail: "Rate-limit cache" },
          { name: "jsonwebtoken", category: "auth", detail: "Session tokens" },
          { name: "zod", category: "tooling", detail: "Schema validation" },
        ],
        repo: "https://github.com/HetulMistry/subscription-tracker",
        demo: "https://subscription-tracker.hetulmistry.tech/",
        status: "live",
        featured: true,
      },
    ],
  },
  {
    id: "web",
    label: "web",
    projects: [
      {
        id: "notion-clone",
        title: "Notion Clone",
        filename: "notion-clone.tsx",
        tagline: "Next.js · Convex · BlockNote",
        description:
          "An exploration of frontend architecture and real-time rich text editing. Workspace with Convex real-time sync, Clerk auth, BlockNote editor, and Zustand state management.",
        stack: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Shadcn UI",
          "Convex",
          "Clerk",
          "BlockNote",
          "Zustand",
          "Zod",
        ],
        architecture: {
          frontend: ["Next.js", "Tailwind CSS", "BlockNote"],
          backend: ["Convex"],
          database: ["Convex"],
          authentication: ["Clerk"],
          storage: ["Convex documents"],
          infrastructure: ["Vercel"],
        },
        dependencies: [
          { name: "next", category: "framework", detail: "App router UI" },
          { name: "react", category: "framework", detail: "Component runtime" },
          { name: "convex", category: "database", detail: "Realtime backend" },
          { name: "clerk", category: "auth", detail: "User identity" },
          { name: "blocknote", category: "ui", detail: "Editor surface" },
          { name: "zustand", category: "state", detail: "Client state" },
          { name: "zod", category: "tooling", detail: "Validation" },
        ],
        repo: "https://github.com/HetulMistry/notion-clone",
        demo: "https://notionclone.hetulmistry.tech/",
        status: "live",
      },
      {
        id: "url-shortener",
        title: "URL Shortener",
        filename: "url-shortener.tsx",
        tagline: "React · Express · PostgreSQL · Analytics",
        description:
          "A full-stack URL shortening platform featuring secure JWT authentication, custom short links, click analytics dashboards, QR code generation, rate limiting, API documentation, and real-time usage insights. Built with a React frontend and an Express + PostgreSQL backend using Prisma ORM.",
        stack: [
          "React",
          "TypeScript",
          "Vite",
          "Tailwind CSS",
          "Shadcn UI",
          "TanStack Query",
          "Express",
          "PostgreSQL",
          "Prisma",
          "JWT",
          "Redis",
          "QR Code",
          "Swagger",
          "Zod",
          "Recharts",
        ],
        architecture: {
          frontend: [
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Shadcn UI",
            "TanStack Query",
            "React Router",
          ],
          backend: [
            "Express",
            "Prisma",
            "JWT",
            "Express Rate Limit",
            "Winston",
          ],
          database: ["PostgreSQL", "Prisma ORM"],
          authentication: ["JWT", "bcrypt"],
          storage: ["PostgreSQL"],
          infrastructure: ["Upstash Redis", "Swagger/OpenAPI", "Vercel"],
        },
        dependencies: [
          {
            name: "react",
            category: "framework",
            detail: "Frontend UI runtime",
          },
          {
            name: "tanstack-query",
            category: "state",
            detail: "Server state management and caching",
          },
          {
            name: "express",
            category: "framework",
            detail: "REST API backend",
          },
          {
            name: "prisma",
            category: "database",
            detail: "Database ORM and schema management",
          },
          {
            name: "postgresql",
            category: "database",
            detail: "Primary relational database",
          },
          {
            name: "redis",
            category: "database",
            detail: "Rate limiting and caching",
          },
          {
            name: "jsonwebtoken",
            category: "auth",
            detail: "Authentication and authorization",
          },
          {
            name: "zod",
            category: "tooling",
            detail: "Schema validation",
          },
          {
            name: "recharts",
            category: "ui",
            detail: "Analytics visualizations",
          },
          {
            name: "qrcode",
            category: "tooling",
            detail: "QR code generation",
          },
        ],
        repo: "https://github.com/HetulMistry/URL-Shortener",
        demo: "https://url-shortener.hetulmistry.tech",
        status: "live",
      },
    ],
  },
];

// ─── Skill Categories ────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    iconName: "LayoutTemplate",
    description:
      "Interfaces with clean component structure and responsive behavior.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "HTML",
      "CSS",
    ],
    pointerColor: "#38bdf8",
  },
  {
    title: "Backend",
    iconName: "Database",
    description:
      "APIs, authentication flows, data modeling, and backend logic.",
    skills: [
      "Node.js",
      "Express",
      "Firebase",
      "REST APIs",
      "SQL",
      "MongoDB",
      "Auth",
    ],
    pointerColor: "#34d399",
  },
  {
    title: "Programming",
    iconName: "Braces",
    description:
      "Core programming, problem solving, and data structure fundamentals.",
    skills: [
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "Data Structures",
      "OOP",
    ],
    pointerColor: "#a78bfa",
  },
  {
    title: "Workflow",
    iconName: "GitBranch",
    description: "Developer tooling and concepts that keep projects reliable.",
    skills: [
      "Git",
      "GitHub",
      "Vite",
      "System Design",
      "AI / ML Basics",
      "CI/CD",
      "Docker",
    ],
    pointerColor: "#f59e0b",
  },
];

// ─── Main Export ─────────────────────────────────────────────────────────────

export const portfolioData = {
  personal: {
    name: "Hetul Mistry",
    title: "Full Stack Engineer",
    subtitle: "Practical engineering, shipped code",
    kicker: "Developer Profile",
    bio: "Building products that matter. Strong foundation across full-stack development, systems design, and AI-driven applications.",
    focus: "Product-oriented development and engineering usable applications.",
    location: "Gandhinagar, Gujarat, India",
    githubUsername: "HetulMistry",
    githubProfileUrl: "https://github.com/HetulMistry",
    linkedinUrl: "https://www.linkedin.com/in/hetulmistry/",
    email: "contact@hetulmistry.tech",
    website: "https://hetulmistry.tech",
    resumeUrl: "#",
    experience: {
      projects: projectCategories.flatMap((c) => c.projects).length,
      repositories: projectCategories
        .flatMap((c) => c.projects)
        .filter((p) => Boolean(p.repo)).length,
    },
  },
  seo: {
    title: "Hetul Mistry | Portfolio",
    description:
      "Personal portfolio of Hetul Mistry, showcasing full-stack engineering, AI integration, and systems design.",
  },
  about: {
    expertise: [
      "React & TypeScript",
      "Backend Systems",
      "Database Design",
      "DevOps & Deployment",
      "AI Integration",
    ],
    currentInterests: [
      "ML deployment pipelines",
      "Data-driven applications",
      "System architecture",
      "Developer experience",
    ],
    learning: [
      "Advanced ML techniques",
      "Distributed systems",
      "Rust fundamentals",
    ],
    education: {
      degree: "B.Tech Computer Science",
      institution: "Silver Oak University",
      focus: "Systems & Algorithms",
    },
    workStyle: {
      approach: "Clean, maintainable code",
      philosophy: "Ship useful products",
      values: ["Code clarity", "User experience", "Engineering excellence"],
    },
  },
  hero: {
    title: "Building usable software & scalable systems.",
    tagline:
      "Software engineer specializing in full-stack web applications, custom developer tools, and intelligent data systems.",
    statusBadge: "Open to full-stack and AI-focused opportunities",
    cta: {
      primary: { text: "View Projects", link: "#projects" },
      secondary: { text: "Contact", link: "#contact" },
    },
    focusAreas: [
      {
        kicker: "01 / Development",
        title: "Full-Stack Web Applications",
        desc: "Building clean React interfaces, backend services, database structures, and production-ready code.",
      },
      {
        kicker: "02 / Intelligence",
        title: "AI Integration & Pipelines",
        desc: "Developing intelligent features, using models via clean APIs, and constructing search-oriented data layers.",
      },
      {
        kicker: "03 / Systems",
        title: "Custom Tooling & Infrastructure",
        desc: "Creating developer utilities, optimizing system speeds, and automating application building/packaging.",
      },
    ],
  },
  skillsSection: {
    title: "Skills",
    subtitle: "Tools I use to build across the stack.",
    description:
      "A focused snapshot of the technologies I use most often, grouped by how I apply them in projects.",
    categories: skillCategories,
  },
  projectsSection: {
    title: "Projects",
    subtitle: "Selected work with a clear engineering signal.",
    description:
      "Browse the file tree and explore each project in a live Safari preview. Right-click any file for quick actions.",
    categories: projectCategories,
    viewAllReposText: "View all repositories",
  },
  contact: {
    title: "Contact",
    heading: "Let us build something useful.",
    description:
      "I am open to internships, collaborations, and conversations around full-stack products, AI tooling, and practical software ideas.",
  },
  footer: {
    builtWith: "React, TypeScript, Tailwind CSS, and Three.js",
  },
};

// ─── Re-exports for backward compatibility ───────────────────────────────────

/** @deprecated Import from portfolioData.projectsSection.categories instead */
export const categories = projectCategories;
