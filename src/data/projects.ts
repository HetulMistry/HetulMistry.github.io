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

export type Category = {
  id: string;
  label: string;
  projects: Project[];
};

export const categories: Category[] = [
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
