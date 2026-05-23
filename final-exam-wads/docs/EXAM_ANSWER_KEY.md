# WADS Practical Final Examination — Answer Key (Instructor Only)

**Project:** Simple Blog (`final-exam-wads`)  
**Do not distribute to students before the exam.**

---

## Planted defects summary

| Question | Location | Defect | Correct fix |
|----------|----------|--------|-------------|
| Q1 | `.env`, `prisma.config.ts` | Wrong DB port `5433`; `DATABASE_URI` env key typo | Port `5432` + fix `DATABASE_URL` in prisma.config |
| Q2 | `.env`, `app/page.tsx`, Postman | HTTPS auth URLs; `/api/doc` link; `postTitle` in Postman | HTTP localhost; `/api/docs`; `title` field |
| Q3 | `lib/validators/post.ts`, `lib/api-error.ts` | Empty title allowed; status 500 | `.min(1)` on title; status `400` |
| Q4 | `.env`, `docker-compose.yml` | Ollama port 9999; compose maps 5433 | `127.0.0.1:11434`; align DB ports |

---

## Question 1 — Full solution

### Root cause

1. `DATABASE_URL` uses port **5433** while a common fix is mapping Postgres to host **5432** (or student updates URL to match compose **5433** consistently).
2. `prisma.config.ts` reads `process.env["DATABASE_URI"]` instead of **`DATABASE_URL`**.

### Fix steps

**`.env`** (aligned with `5432:5432` compose — see Q4 alternative):

```env
DATABASE_URL="postgresql://wads:wads@localhost:5432/blog_exam"
```

**`prisma.config.ts`:**

```typescript
datasource: {
  url: process.env["DATABASE_URL"],
},
```

**Commands:**

```bash
docker compose up -d
npm run db:generate
npm run db:migrate
```

### Expected output

- `prisma migrate deploy` → `All migrations have been successfully applied`
- `npm run dev` → Ready on `http://localhost:3000`

### Rubric (25 pts)

| Criteria | Points |
|----------|--------|
| Correct `DATABASE_URL` | 10 |
| Correct `prisma.config.ts` datasource url | 8 |
| Migration runs successfully | 7 |

---

## Question 2 — Full solution

### Root cause

Better Auth requires `baseURL` to match the actual origin. Using `https://localhost:3000` breaks cookie/session handling when the app runs on **http**.

Swagger link points to `/api/doc` but route is `/api/doc**s**`.

Postman Create Post uses `postTitle` instead of `title`.

### Fix steps

**`.env`:**

```env
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

**`app/page.tsx`:**

```tsx
<Link href="/api/docs">
```

**Postman** body for Create Post:

```json
{
  "title": "My Exam Post",
  "content": "Content for practical exam.",
  "published": true
}
```

### Verification

1. Register at `/register`
2. Postman Sign In → cookie stored
3. Create Post → `201`
4. Open `http://localhost:3000/api/docs` → Swagger UI loads `/openapi.json`

### Rubric (25 pts)

| Criteria | Points |
|----------|--------|
| Auth env fixed, login works | 12 |
| Postman create/list works | 8 |
| Swagger path fixed | 5 |

---

## Question 3 — Full solution

### Root cause

`createPostSchema` uses `z.string()` without minimum length for `title`.

`validationErrorResponse` returns status **500** instead of **400**.

### Fix steps

**`lib/validators/post.ts`:**

```typescript
title: z.string().min(1, "Title is required"),
```

**`lib/api-error.ts`:**

```typescript
{ status: 400 }
```

### Expected test output

```
PASS __tests__/validators/post.test.ts
PASS __tests__/lib/api-error.test.ts
PASS __tests__/lib/ollama.test.ts

Tests: 6 passed, 6 total
```

### Rubric (25 pts)

| Criteria | Points |
|----------|--------|
| Title validation | 10 |
| HTTP 400 for Zod errors | 10 |
| All Jest tests pass | 5 |

---

## Question 4 — Full solution

### Root cause

`docker-compose.yml` maps `5433:5432` while `.env` may still be wrong after Q1 — student must pick **one** consistent pair:

**Option A (recommended):** Host port 5432

```yaml
ports:
  - "5432:5432"
```

```env
DATABASE_URL="postgresql://wads:wads@localhost:5432/blog_exam"
```

**Option B:** Keep 5433 mapping and URL port 5433 (also valid if consistent).

Ollama URL `http://localhost:9999` is invalid. Correct: `http://127.0.0.1:11434`.

### Fix steps

```env
OLLAMA_BASE_URL="http://127.0.0.1:11434"
OLLAMA_MODEL="phi3:mini"
```

Ensure Ollama is running:

```bash
ollama serve
ollama pull phi3:mini
```

Test:

```bash
curl http://127.0.0.1:11434/api/tags
```

Browser: Create post → **Summarize with AI** → summary paragraph appears.

### Rubric (25 pts)

| Criteria | Points |
|----------|--------|
| Docker Postgres healthy + port alignment | 10 |
| Ollama env correct | 8 |
| AI summarize works in UI or Postman | 7 |

---

## Reference solution branch

Instructors may maintain a clean solution:

```bash
git tag student-v1.0    # buggy version distributed
git tag solution-v1.0 # after applying all fixes above
```

---

*End of answer key*
