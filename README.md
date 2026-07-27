# Bilal Yasir — Premium Interactive 3D Portfolio

A world-class, Awwwards-inspired personal portfolio built as a traditional React SPA with a standalone Node.js + Express backend.

## Tech Stack

### Frontend
- React + Vite + TypeScript
- Tailwind CSS
- Framer Motion
- React Three Fiber (Three.js)
- GSAP
- React Icons
- Lenis Smooth Scrolling
- React Tilt
- React Intersection Observer
- Axios

### Backend
- Node.js + Express.js
- Helmet, CORS, Compression, Morgan
- Express Rate Limit
- Server-side validation
- JSON file storage (easily replaceable with Supabase / PostgreSQL / MongoDB)

### Development Tools
- npm
- ESLint
- Git

## Architecture

```
portfolio/
├── client/         (React + Vite — represented by /src)
├── server/         (Node.js + Express)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── data/       (JSON data store)
├── public/
└── README.md
```

The frontend and backend are runnable independently during development.

## Getting Started

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Server runs on `http://localhost:5001`.

### 2. Frontend
From the project root:
```bash
npm install
npm run dev
```
Frontend runs on Vite's dev server and proxies `/api` requests to the backend.

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/profile` | Profile + stats data |
| GET | `/api/skills` | Skills data |
| GET | `/api/projects` | Projects (supports `?category=` and `?search=`) |
| GET | `/api/projects/:id` | Single project |
| GET | `/api/experience` | Timeline, experience, achievements, AI workflow |
| POST | `/api/contact` | Contact form submission (validated + rate limited) |
| GET | `/api/cv/download` | Download CV (tracks downloads) |
| POST | `/api/analytics/visit` | Track visitor |
| GET | `/api/analytics/visitors` | Visitor count |
| POST | `/api/analytics/project-view` | Track project view |
| POST | `/api/analytics/resume-download` | Track resume download |

## Deployment

- **Frontend:** Vercel (set `VITE_API_URL` to backend URL)
- **Backend:** Render or Railway (set `PORT`, `CORS_ORIGIN`, `NODE_ENV`)

## Features

- Interactive 3D hero scene with mouse parallax
- Neural-network skills visualization
- Project showcase with filtering, search, and detail modal
- Cinematic scroll experience with Lenis
- Custom cursor, scroll progress, command palette (Ctrl+K)
- Konami Code easter egg (Developer Mode)
- Toast notifications, magnetic buttons, tilt cards
- Server-side validation + rate limiting on contact form
- SEO metadata, Open Graph, structured data
- Fully responsive, accessible, dark-mode optimized
