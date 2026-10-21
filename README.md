# DevPulse AI Portfolio & Resume SaaS (Next.js Frontend)

**DevPulse Frontend** is a modern, high-performance web application built with **Next.js 14+ (App Router)** and **TypeScript**. It interfaces directly with the Spring Boot backend to power multi-tenant developer portfolios, real-time resume editing, AI-driven copilot prompt generation, and instant ATS-optimized PDF compilation.

---

## Tech Stack & Architecture
*   **Framework:** Next.js 14+ (App Router, Server & Client Components)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Server State & Caching:** TanStack React Query (React Query v5)
*   **HTTP Client:** Axios with automated Bearer JWT token interceptors
*   **UI Components & Icons:** Lucide React

---

## Project Structure
```text
devpulse-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout wrapping React Query Providers
│   │   ├── page.tsx           # SaaS Landing Page
│   │   ├── login/             # User Authentication (Login)
│   │   ├── signup/            # User Registration & Tenant Subdomain Provisioning
│   │   └── dashboard/         # Main Workspace (Profile CRUD, AI Copilot, PDF Export, CSV Ingestion)
│   ├── components/
│   │   └── Providers.tsx      # TanStack Query Client Provider setup
│   ├── lib/
│   │   └── api-client.ts      # Configured Axios instance with automatic JWT header injection
│   ├── services/
│   │   └── api.ts             # Centralized API service methods mapping to Spring Boot backend
│   └── types/
│       └── index.ts           # TypeScript interfaces (UserAuth, ProfileData, TemplateData, etc.)
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## Core Features & Backend Integration

1. **Authentication (`/signup`, `/login`):**
   * Connects to `/api/v1/auth/signup` and `/api/v1/auth/login`.
   * Provisions user tenant subdomains (`*.devpulse.ai`) and stores JWT tokens securely in browser storage.
2. **Dashboard Workspace (`/dashboard`):**
   * **Profile Manager:** Fetches and updates professional summaries, headlines, and social URLs via `/api/v1/profile/{userId}`.
   * **Local AI Copilot:** Sends custom prompts to `/api/v1/copilot/chat` leveraging local Ollama LLMs.
   * **ATS-Optimized PDF Export:** Compiles live profiles into downloadable PDFs via `/api/v1/pdf/generate`.
   * **LinkedIn Archive Ingestion:** Uploads official career archives via multipart form data (`/api/v1/ingest/linkedin-csv`).

---

## Getting Started & Local Execution

1. **Prerequisites:** Ensure **Node.js 18+** and **npm** are installed.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables (Optional):**
   Create a `.env.local` file in the root directory if your backend runs on a custom port:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
4. **Run Development Server:**
   ```bash
   npm run dev
   ```
5. **Open in Browser:**
   Navigate to [http://localhost:3000](http://localhost:3000). *(Ensure your Spring Boot backend is running on port 8080).*
