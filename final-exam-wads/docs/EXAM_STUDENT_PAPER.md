# WADS Practical Final Examination — Student Paper

---

## Examination Header

| Field | Detail |
|-------|--------|
| **Course** | Web Application Development and Security (WADS) |
| **Program** | Computer Science — BINUS University International |
| **Semester** | 5 (Even Semester 2025/2026) |
| **Exam Type** | Practical Final Examination (Lab) |
| **Project** | Simple Blog Web Application |
| **Duration** | 120 minutes (2 hours) |
| **Total Questions** | 4 (3 Easy + 1 Medium) |
| **Total Points** | 100 |

---

## Important Rules

1. **No internet access** is allowed during this examination. All required files are provided in the lab ZIP package.
2. Do **not** run `npm install` unless explicitly instructed by the examiner (dependencies are pre-installed).
3. You may use: VS Code, terminal, Docker Desktop, pgAdmin, Postman, Git, browser (localhost only), and local Ollama.
4. **Firebase / Google login is NOT required** for this exam.
5. Submit your work via Git commits and screenshots as described in Section 6.
6. Ask the examiner only if the lab machine has a hardware or environment failure.

---

## Environment Checklist

Before starting, confirm:

- [ ] Node.js 20+ (`node -v`)
- [ ] Docker Desktop running (`docker --version`)
- [ ] Ollama running locally with model **phi3:mini** (`ollama list`)
- [ ] Project folder extracted from exam ZIP
- [ ] File `.env` exists (copy from `.env.example` if needed)

---

## Project Overview

You are given a **Simple Blog** full-stack application built with:

- **Next.js 16** (App Router) + **Node.js**
- **Better Auth** (email & password)
- **PostgreSQL** + **Prisma ORM**
- **REST API** (`/api/posts`, `/api/ai/summarize`)
- **Swagger** API documentation
- **Jest** for automated tests
- **Docker** for PostgreSQL and optional app container
- **Ollama (phi3:mini)** for offline AI summarization

### Suggested startup (after fixing Task 1)

```bash
docker compose up -d          # PostgreSQL only (offline-safe)
npm run db:generate
npm run db:migrate
npm run dev                   # App runs on your machine, not inside Docker
```

> **Note:** `docker compose up -d` does **not** build the application container (that would need internet for `npm ci`). Only the database container starts. This is intentional for the offline exam.

Application URL: `http://localhost:3000`

---

## Question 1 — Environment & Database Setup (Easy)

**Points:** 25  
**Sessions:** 1, 7  
**Estimated time:** 25 minutes

### Learning objectives

- Configure environment variables correctly
- Connect the application to PostgreSQL using Prisma
- Run database migrations offline

### Scenario

When you run the application or Prisma commands, you see errors such as:

- `Can't reach database server`
- Prisma client or migration failures

### Tasks

1. Open `.env` and fix **`DATABASE_URL`** so it matches the PostgreSQL port exposed by `docker-compose.yml`.
2. Open `prisma.config.ts` and ensure Prisma reads the correct database connection string from your environment variables.
3. Run:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```
4. Verify the database is reachable (e.g. `npm run db:studio` or pgAdmin).

### Acceptance criteria

- [ ] `npm run db:migrate` completes without error
- [ ] `npm run dev` starts without database connection errors
- [ ] You can register a new user in the browser

### Files you may edit

- `.env`
- `prisma.config.ts`

### Deliverables

- Screenshot of successful migration terminal output
- Git commit: `fix: database connection and prisma config (Q1)`

---

## Question 2 — REST API, Authentication & API Documentation (Easy)

**Points:** 25  
**Sessions:** 5, 6, 8  
**Estimated time:** 25 minutes

### Learning objectives

- Fix Better Auth base URL configuration
- Test REST endpoints with Postman
- Access Swagger API documentation

### Scenario

- Login or registration fails with network/CORS-like errors
- Postman **Create Post** request returns validation or 4xx errors
- The **API Docs** button on the home page does not open Swagger UI

### Tasks

1. Fix **`BETTER_AUTH_URL`** and **`NEXT_PUBLIC_BETTER_AUTH_URL`** in `.env` (must match how you access the app in the browser).
2. Fix **`NEXT_PUBLIC_APP_URL`** if needed.
3. Import `postman/Blog-WADS-Final.postman_collection.json` into Postman.
4. Run requests in order: **Sign Up → Sign In → Create Post → List Posts**. Fix any issue in the project or Postman body so **Create Post** succeeds.
5. Fix the Swagger UI route so opening API docs from the app (or visiting the correct URL) displays the OpenAPI specification.

### Acceptance criteria

- [ ] Register and login work in the browser
- [ ] Postman **Posts — Create** returns `201` with a new post
- [ ] Postman **Posts — List** returns your post(s)
- [ ] Swagger UI loads at the correct path (see `/api/docs` or examiner hint)

### Files you may edit

- `.env`
- `app/page.tsx` (API docs link only)
- Postman collection (body field names only if instructed)

### Deliverables

- Screenshot of Postman successful Create + List
- Screenshot of Swagger UI
- Git commit: `fix: auth env and api docs path (Q2)`

---

## Question 3 — Security, Validation & Jest Testing (Easy)

**Points:** 25  
**Sessions:** 4, 9  
**Estimated time:** 30 minutes

### Learning objectives

- Enforce input validation with Zod
- Return correct HTTP status codes for validation errors
- Pass automated Jest tests

### Scenario

- The API accepts blog posts with an **empty title**
- Validation errors return HTTP **500** instead of **400**
- Running `npm test` shows **2 failing tests**

### Tasks

1. Update `lib/validators/post.ts` so **title** cannot be empty.
2. Update `lib/api-error.ts` so validation failures return status **400**.
3. Run `npm test` until **all tests pass**.

### Acceptance criteria

- [ ] `npm test` — all suites passed
- [ ] Sending `{ "title": "", "content": "hello" }` to `POST /api/posts` returns **400** (test via Postman after login)

### Files you may edit

- `lib/validators/post.ts`
- `lib/api-error.ts`

### Deliverables

- Screenshot of `npm test` all green
- Git commit: `fix: validation and error status codes (Q3)`

---

## Question 4 — Docker, Deployment & Local AI (Medium)

**Points:** 25  
**Sessions:** 10, 11  
**Estimated time:** 40 minutes

### Learning objectives

- Align Docker Compose ports with application configuration
- Configure local Ollama for AI summarization
- Verify containerized database and AI feature

### Scenario

- Docker PostgreSQL port does not match `DATABASE_URL`
- **Summarize with AI** on the create post page fails
- `OLLAMA_BASE_URL` may point to the wrong host/port

### Tasks

1. Fix **`docker-compose.yml`** and/or `.env` so PostgreSQL port mapping is consistent (host port **5432** or **5433** — but URL and compose must match).
2. Ensure **Ollama** is running: `ollama serve` and model `phi3:mini` is available.
3. Fix **`OLLAMA_BASE_URL`** and verify **`OLLAMA_MODEL=phi3:mini`** in `.env`.
4. Restart services, create a post with at least 10 characters, click **Summarize with AI**, and confirm a summary appears.
5. Run `docker compose ps` and capture logs showing healthy Postgres.

### Acceptance criteria

- [ ] `docker compose up -d` — **postgres** container healthy (app runs via `npm run dev`, not Docker)
- [ ] AI summarize returns JSON with a `summary` field
- [ ] Postman **AI — Summarize** returns `200` when authenticated

### Files you may edit

- `.env`
- `docker-compose.yml`
- `lib/ollama.ts` (only if examiner allows)

### Deliverables

- Screenshot of AI summary in browser
- Screenshot of `docker compose ps`
- Git commit: `fix: docker ports and ollama config (Q4)`

---

## Section 6 — Submission Checklist

| # | Item | Done |
|---|------|------|
| 1 | 4 Git commits (Q1–Q4) with clear messages | ☐ |
| 2 | Screenshot: DB migration success | ☐ |
| 3 | Screenshot: Postman auth + posts | ☐ |
| 4 | Screenshot: Swagger UI | ☐ |
| 5 | Screenshot: Jest all passed | ☐ |
| 6 | Screenshot: AI summarize + Docker ps | ☐ |

**Student ID:** ____________________  
**Name:** ____________________  
**Date:** ____________________  
**Signature:** ____________________

---

*End of examination paper*
