# WADS Quiz 02 — Answer Key (Instructor Only)

**Course:** Web Application Development and Security (WADS)  
**Project:** Todo List — `quiz-wads-02`  
**Duration:** 100 minutes | **Total:** 100 marks  
**Do NOT distribute to students before the exam.**

---

# SECTION 01 — Class Theory (Model Answers)

---

## SECTION A — API Testing & ORM

### Q1. [2 pts] — Postman test for HTTP 403

**Model answer:**

```javascript
pm.test("Status code is 403", function () {
  pm.response.to.have.status(403);
});
```

**403 Forbidden** means the server understood the request and the client is **authenticated** (or identity is known), but the client **does not have permission** to access the resource. **401 Unauthorized** means authentication is **missing or invalid** (not logged in or bad credentials).

**Sample references:** MDN HTTP 403; Postman Learning Center — Writing tests.

**Rubric:** 1 pt script syntax | 1 pt 403 vs 401 explanation

---

### Q2. [3 pts] — Prisma include → SQL

**(a) Equivalent SQL (approximate):**

```sql
SELECT
  t.*,
  u.name AS user_name,
  u.email AS user_email
FROM todo t
INNER JOIN "user" u ON t."userId" = u.id
WHERE t."userId" = 'abc123';
```

(Exact table/column names may vary; accept JOIN + WHERE userId.)

**(b) One ORM advantage:** Type-safe queries at compile time; automatic mapping to TypeScript types; less risk of SQL injection when using parameterized queries; easier relation loading with `include`.

**Rubric:** 1.5 pts SQL | 1.5 pts advantage

---

### Q3. [2 pts] — Schema problems

| Problem | Fix |
|---------|-----|
| `id INT` without PRIMARY KEY / auto-increment | Use `id SERIAL PRIMARY KEY` or `UUID PRIMARY KEY` |
| `created_at VARCHAR(30)` wrong type | Use `TIMESTAMP` or `TIMESTAMPTZ` |
| No FOREIGN KEY on `user_id` | Add `REFERENCES users(id)` |
| `priority VARCHAR(20)` unbounded | Use ENUM or CHECK constraint |

Accept any **two** valid problems + fixes.

**Rubric:** 1 pt each problem+fix pair

---

### Q4. [3 pts] — Postman protected endpoint

**Model steps:**

1. **Authenticate:** POST `/api/auth/sign-in/email` with JSON body; Postman stores session cookie automatically (or use Bearer token if applicable).
2. **Method & URL:** Select `GET` or `POST`, enter e.g. `http://localhost:3000/api/todos`.
3. **Body:** For POST, choose **raw → JSON**, e.g. `{ "title": "Study WADS", "priority": "HIGH" }`.
4. **Verify:** Check Status (200/201), response body JSON in Postman response panel.
5. **Assertion:**

```javascript
pm.test("Returns todos array", function () {
  pm.response.to.have.status(200);
  const json = pm.response.json();
  pm.expect(json.data).to.be.an("array");
});
```

**Rubric:** 1 pt auth | 1 pt method/body/verify | 1 pt assertion

---

## SECTION B — Authentication & JWT

### Q5. [2 pts] — Auth vs Authz

| Term | Meaning | Todo app example |
|------|---------|------------------|
| **Authentication** | Verifying **who** the user is | Login with email/password or Google |
| **Authorization** | Verifying **what** the user may do | Only the todo **owner** may DELETE their todo |

**Rubric:** 1 pt definitions | 1 pt examples

---

### Q6. [3 pts] — JWT payload

(a) **Header**, **Payload**, **Signature**  
(b) **`exp`** = expiration time (Unix timestamp); token invalid after this time  
(c) JWTs over HTTPS prevent **interception/tampering** on the network; without HTTPS, tokens can be stolen via MITM

**Rubric:** 1 pt each part (a,b,c)

---

### Q7. [2 pts] — CORS

**CORS** (Cross-Origin Resource Sharing) is a browser security policy that blocks web pages from calling APIs on a **different origin** unless the server sends allowed CORS headers.

**Scenario:** Browser at `http://localhost:3000` fetches `https://ollama.csbihub.id/api/generate` directly from client-side JS without a server proxy — browser may block due to missing `Access-Control-Allow-Origin` from Ollama (or preflight failure).

**Note:** In this project, Ollama is called from **Next.js API route** (server-side), avoiding browser CORS — accept either explanation.

**Rubric:** 1 pt CORS definition | 1 pt scenario

---

### Q8. [3 pts] — Better Auth vs Firebase

| Aspect | Better Auth | Firebase Google |
|--------|-------------|-----------------|
| Where verified | App server + PostgreSQL (Prisma) | Google / Firebase servers |
| Stored after login | Session cookie (`better-auth.session_token`) | Firebase client auth state; bridged to app session via `/api/auth/google` |
| Use in project | Email/password API access | Google OAuth popup on login page |

**Rubric:** 1 pt per row (approximate)

---

## SECTION C — Web Security

### Q9. [3 pts] — XSS

(a) **Cross-Site Scripting (XSS)**  
(b) Script executes in victim's browser → session theft, defacement, phishing  
(c) **Two defences:** Input validation (reject/sanitize `<script>`); output encoding/escaping; Content-Security-Policy (CSP); React default escaping for JSX text nodes

**Rubric:** 1 pt each (a,b,c with two defences)

---

### Q10. [2 pts] — Error handler

**Problems:**
1. Exposes **stack trace** to client (information disclosure)
2. Always returns **500** even for validation errors; leaks internal error strings

**Corrected version:**

```typescript
export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validation failed", details: error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  console.error(error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}
```

**Rubric:** 1 pt per problem identified | partial for fix

---

### Q11. [2 pts] — Validation vs sanitisation

| | Validation | Sanitisation |
|---|------------|--------------|
| **Definition** | Check input meets rules | Transform/remove dangerous content |
| **Todo title example** | `z.string().min(1).max(200)` | Strip HTML tags: `title.replace(/<[^>]*>/g, "")` |

**Rubric:** 1 pt definitions | 1 pt examples

---

### Q12. [3 pts] — Proxy chain for PUT /api/todos/[id]

| # | Step | Responsibility |
|---|------|----------------|
| 1 | `proxy.ts` matcher | Match `/api/todos/:path*` routes |
| 2 | Session check | Verify Better Auth session cookie |
| 3 | Route handler auth | Confirm user owns the todo (`userId` match) |
| 4 | Zod validation | Validate PUT body (title, priority, etc.) |

Accept equivalent middleware ordering with clear responsibilities.

**Rubric:** 0.75 pt per row (4 rows)

---

## SECTION D — Docker & CI/CD

### Q13. [3 pts] — Docker image vs container

- **Image:** Read-only template/layers (blueprint)
- **Container:** Running instance of an image

| Instruction | Purpose |
|-------------|---------|
| `FROM node:20-alpine` | Base image |
| `WORKDIR /app` | Set working directory |
| `COPY package*.json ./` | Copy dependency manifests |
| `RUN npm ci` | Install dependencies |
| `ENV DATABASE_URL=...` | Dummy URL for **build-time** (Prisma/Next collect page data) |
| `RUN npm run build` | Build production app |
| `EXPOSE 3000` | Document listen port |
| `CMD ["node", "server.js"]` | Start command at runtime |

**Rubric:** 1 pt image vs container | 2 pts instructions

---

### Q14. [2 pts] — depends_on healthcheck

(a) **`service_healthy`** waits until the Postgres **healthcheck** command (`pg_isready`) succeeds.  
(b) Plain `depends_on` only waits for container **start**, not DB **ready to accept connections** — API may crash on first connect.

**Rubric:** 1 pt each

---

### Q15. [2 pts] — GitHub Actions

**Role:** Automate build, test, and deploy on git events.

**On push to `main` (example steps):**
1. Checkout code
2. Setup Node.js
3. `npm ci`
4. `npm run lint`
5. `npm test`
6. `docker build` / deploy to server

Accept any three valid CI steps.

**Rubric:** 1 pt role | 1 pt three steps

---

### Q16. [3 pts] — Log testing

(a) `docker compose logs app --tail=100 | grep "Server started on port 3000"`  
(b) `docker compose logs app --tail=100 | grep -q FATAL && exit 1 || exit 0`  
   or: `if grep -q FATAL <<< "$(docker compose logs app)"; then exit 1; fi`

(c) **Cause:** App connects to `127.0.0.1:5433` inside container but Postgres is on service **`postgres:5432`**. **Fix:** Set `DATABASE_URL=postgresql://wads:wads@postgres:5432/todo_quiz` in compose environment (not localhost/wrong port).

**Rubric:** 1 pt each (a,b,c)

---

# SECTION 02 — Practical Lab (`quiz-wads-02`)

---

## Planted Defects Summary (Quiz 02 vs Quiz 01)

| Q | Quiz 01 bug | Quiz 02 bug (this exam) |
|---|-------------|-------------------------|
| 1 | `ownerId` on POST | Wrong DB port + `created_at` in orderBy |
| 2 | `API_KY` typo | `https` auth URLs + `AUTH_DOMAN` typo |
| 3 | Empty title + DELETE no auth | Empty title + PUT no auth |
| 4 | http Ollama + EXPOSE 4000 | http Ollama + wrong model + EXPOSE 4000 |

---

## Lab Q1 Solution [15 pts]

**`.env`:**

```env
DATABASE_URL="postgresql://wads:wads@localhost:5432/todo_quiz"
```

**`app/api/todos/route.ts`:**

```typescript
orderBy: { createdAt: "desc" },
```

**Commands:**

```bash
docker compose up -d
npm run db:migrate
npm run dev
```

**Verify:** GET `/api/todos` → 200 with `{ data: [...] }`

| Criteria | Points |
|----------|--------|
| Correct DATABASE_URL | 7 |
| Correct orderBy field | 5 |
| Postman/browser list works | 3 |

---

## Lab Q2 Solution [15 pts]

**`.env`:**

```env
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

NEXT_PUBLIC_FIREBASE_API_KEY="your-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
```

`lib/firebase.ts` reads **`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`** — env key must match exactly (not `AUTH_DOMAN`).

**Verify:** Google sign-in → redirect `/todos`; email login works.

| Criteria | Points |
|----------|--------|
| Better Auth URLs fixed (http) | 6 |
| Firebase env keys fixed | 6 |
| Both login methods work | 3 |

---

## Lab Q3 Solution [15 pts]

**`lib/validators/todo.ts`:**

```typescript
title: z.string().min(1, "Title is required").max(200),
```

**`app/api/todos/[id]/route.ts` PUT:**

```typescript
export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return unauthorizedResponse();

  const existing = await prisma.todo.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return notFoundResponse("Todo not found");

  const body = await request.json();
  const input = updateTodoSchema.parse(body);
  // ... update as before
}
```

**Expected tests:**

```
PASS __tests__/validators/todo.test.ts
PASS __tests__/lib/ollama.test.ts (may still fail until Q4)
```

| Criteria | Points |
|----------|--------|
| Title validation `.min(1)` | 5 |
| PUT auth + ownership | 7 |
| npm test validators pass | 3 |

---

## Lab Q4 Solution [15 pts]

**`.env`:**

```env
OLLAMA_BASE_URL="https://ollama.csbihub.id"
OLLAMA_MODEL="gemma4:26b"
```

**`Dockerfile`:**

```dockerfile
EXPOSE 3000
```

**Verify:**

```bash
OLLAMA_BASE_URL=https://ollama.csbihub.id OLLAMA_MODEL=gemma4:26b npm test
docker compose up -d --build
```

AI Suggest on `/todos/new` returns suggestion text.

| Criteria | Points |
|----------|--------|
| OLLAMA_BASE_URL https | 5 |
| OLLAMA_MODEL gemma4:26b | 5 |
| EXPOSE 3000 + tests pass + AI works | 5 |

---

## Git Commit Reference (Lab)

| Q | Expected commit message |
|---|-------------------------|
| Q1 | `fix: database url and todo list query (Q1)` |
| Q2 | `fix: better auth and firebase env (Q2)` |
| Q3 | `fix: todo validation and put authorization (Q3)` |
| Q4 | `fix: ollama config and docker expose (Q4)` |

---

## Section 01 Marking Guide (40 pts)

| Section | Questions | Marks |
|---------|-----------|-------|
| A | Q1–Q4 | 10 |
| B | Q5–Q8 | 10 |
| C | Q9–Q12 | 10 |
| D | Q13–Q16 | 10 |

Award partial credit for partially correct answers. Require **≥2 references per question** for full marks on theory items (deduct 1–2 pts per missing references at instructor discretion).

---

*Confidential — instructors only*

*End of Quiz 02 Answer Key — Variation B*
