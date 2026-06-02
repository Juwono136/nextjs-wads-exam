# BINUS UNIVERSITY INTERNATIONAL

## Computer Science Department — QUIZ 02 (Variation B)

**Course:** Web Application Development and Security  
**Course Code:** COMP67030001  
**Semester:** 5  
**Duration:** 100 Minutes  
**Total Marks:** 100

---

**Name:** ________________________________  
**Student ID:** _______________________  
**Class:** ___________________________________  
**Date:** ___________________________________

---

## INSTRUCTIONS

### SECTION 01 — Class Theory (Written)

- Answer **ALL** questions.
- You **MUST** include at least **2 references** per question.
- References must support your reasoning (not just pasted links).
- Diagrams (if any) can be drawn or described.
- Focus on logic, architecture, and justification.

### SECTION 02 — Practical Lab

- You may use the internet (npm, Firebase Console docs, Ollama remote API).
- Work on your own laptop with the provided `**quiz-wads-02`** project.
- Use Git for version control; submit commits and screenshots.

---

## Score Summary


| Section        | Component                      | Marks     |
| -------------- | ------------------------------ | --------- |
| **Section 01** | A — API Testing & ORM          | / 10      |
|                | B — Authentication & JWT       | / 10      |
|                | C — Web Security               | / 10      |
|                | D — Docker & CI/CD             | / 10      |
|                | **Section 01 Total**           | **/ 40**  |
| **Section 02** | Q1 — Database & REST API       | / 15      |
|                | Q2 — Authentication & Firebase | / 15      |
|                | Q3 — Security & Validation     | / 15      |
|                | Q4 — Docker, Remote AI & Jest  | / 15      |
|                | **Section 02 Total**           | **/ 60**  |
|                | **GRAND TOTAL**                | **/ 100** |


---

# SECTION 01 — Class Theory

---

## SECTION A — API Testing & DB Schema / ORM [10 marks]

**Topics:** Manual API testing with Postman | Database schema design | ORM (Prisma)

---

### Q1. [2 pts]

A Postman request to `GET /api/todos` returns HTTP **403 Forbidden**. Write the exact Postman test script (`pm.test` syntax) that asserts this status code, AND explain what **403** means compared to **401**.

*(Please answer here)*

---

---

---

### Q2. [3 pts]

Your Prisma query is:

```typescript
const todos = await prisma.todo.findMany({
  where: { userId: "abc123" },
  include: { user: { select: { name: true, email: true } } },
});
```

(a) Write the equivalent **raw SQL** this query would produce (JOIN syntax).  
(b) Explain **ONE** advantage of using Prisma ORM over writing that SQL directly in your API route.

*(Please answer here)*

---

---

---

### Q3. [2 pts]

Identify **TWO** problems in this database schema definition and state how you would fix each one:

```sql
CREATE TABLE todos (
  id INT,
  title VARCHAR(255),
  user_id INT,
  priority VARCHAR(20),
  created_at VARCHAR(30)
);
```

*(Please answer here)*

---

---

---

### Q4. [3 pts]

Describe the steps to test a **protected** REST API endpoint manually using Postman. Your answer must include:

- How you authenticate first (cookie or token)
- How you set the request method and URL
- How you add a JSON request body
- How you verify the response status and body
- How you write **one** automated assertion in the Postman **Tests** tab

*(Please answer here)*

---

---

---

## SECTION B — Authentication, Authorization & JWT [10 marks]

**Topics:** Sessions | Cookies | JWT | OAuth2 | CORS | Firebase

---

### Q5. [2 pts]

Explain the difference between **Authentication** and **Authorization**. Give one real-world example of each from the **Todo List** project used in this quiz.

*(Please answer here)*

---

---

---

### Q6. [3 pts]

A JWT payload (Base64-decoded) looks like this:

```json
{
  "sub": "user_42",
  "email": "student@binus.ac.id",
  "iat": 1710000000,
  "exp": 1710086400
}
```

(a) Name the **three parts** of a JWT.  
(b) What does the `**exp`** claim mean?  
(c) Why should JWTs be transmitted over **HTTPS** only?

*(Please answer here)*

---

---

---

### Q7. [2 pts]

What is **CORS** and why does a browser enforce it? Give **ONE** specific scenario where a CORS error would occur when your Next.js app at `http://localhost:3000` calls a remote API at `https://ollama.csbihub.id`.

*(Please answer here)*

---

---

---

### Q8. [3 pts]

Compare **Better Auth session cookies** and **Firebase Google sign-in** in the Todo List app by completing the table:


| Aspect                          | Better Auth (email/password) | Firebase (Google) |
| ------------------------------- | ---------------------------- | ----------------- |
| Where credentials are verified  |                              |                   |
| What the app stores after login |                              |                   |
| Typical use in this project     |                              |                   |


*(Please answer here)*

---

---

---

## SECTION C — Web Security, Validation & Middleware [10 marks]

**Topics:** Input Validation | Proxy/Middleware | Error Handling | Security Testing

---

### Q9. [3 pts]

Look at this todo creation request body:

```json
{
  "title": "<script>alert('xss')</script>",
  "description": "Buy groceries"
}
```

(a) What type of attack is this attempting?  
(b) Why is it dangerous if the server renders `title` as raw HTML without escaping?  
(c) Name **TWO** defences you can apply in a Next.js full-stack app.

*(Please answer here)*

---

---

---

### Q10. [2 pts]

A developer wrote this API error handler:

```typescript
export function handleApiError(error: unknown) {
  return NextResponse.json(
    { error: String(error), stack: (error as Error).stack },
    { status: 500 }
  );
}
```

Identify **TWO** security problems with this code and write a corrected version.

*(Please answer here)*

---

---

---

### Q11. [2 pts]

Explain the difference between **input validation** and **input sanitisation**. Give one example of each for the **todo title** field in this project.

*(Please answer here)*

---

---

---

### Q12. [3 pts]

Design a simple **proxy/middleware** chain for `PUT /api/todos/[id]`. List each step in order and state its **ONE** responsibility:


| #   | Step Name | Responsibility |
| --- | --------- | -------------- |
| 1   |           |                |
| 2   |           |                |
| 3   |           |                |
| 4   |           |                |


*(Please answer here)*

---

---

---

## SECTION D — Docker, CI/CD & Deployment [10 marks]

**Topics:** Dockerfile | Docker Compose | GitHub Actions | Deployment | Log Testing

---

### Q13. [3 pts]

Explain the difference between a **Docker Image** and a **Docker Container**. Then describe the purpose of each instruction in this Dockerfile snippet:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]
```

*(Please answer here)*

---

---

---

### Q14. [2 pts]

In `docker-compose.yml`, the `app` service has:

```yaml
depends_on:
  postgres:
    condition: service_healthy
```

(a) What does `**service_healthy**` check?  
(b) Why is this better than `depends_on: [postgres]` alone?

*(Please answer here)*

---

---

---

### Q15. [2 pts]

Describe the role of **GitHub Actions** in a CI/CD pipeline for a Next.js project. What happens automatically when a developer pushes to the `main` branch? List at least **THREE** steps the pipeline would run.

*(Please answer here)*

---

---

---

### Q16. [3 pts]

After deployment you run:

```bash
docker compose logs app --tail=100
```

The log shows:

```
[INFO] Server started on port 3000
[ERROR] FATAL: connect ECONNREFUSED 127.0.0.1:5433
```

(a) Write the bash command using `grep` that checks for the startup message.  
(b) Write the bash command that would **FAIL** (exit code ≠ 0) if a `FATAL` error exists.  
(c) What is the most likely cause of the FATAL error in a Docker Compose setup, and how do you fix it?

*(Please answer here)*

---

---

---

# SECTION 02 — Practical Lab (`quiz-wads-02`)

---

## Environment Checklist

- Node.js 20+
- Docker Desktop
- `.env` configured (copy from `.env.example`)
- Firebase project credentials (Google sign-in)
- Internet access to `https://ollama.csbihub.id`

---

## Startup

1. Open the project folder `**quiz-wads-02`** in VS Code.
2. Ensure PostgreSQL is available (Docker or pgAdmin). Database name: `**todo_quiz`**.
3. Start Docker Desktop, then run:

```bash
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

1. Open: **[http://localhost:3000](http://localhost:3000)**

---

## Q1. [15 pts] Database Connection & REST API List

### Scenario

- The application fails to connect to PostgreSQL, **OR**
- After login, **GET /api/todos** returns a Prisma error about an unknown field in `orderBy`.

### Tasks

1. Fix `DATABASE_URL` in `.env` so the port matches `docker-compose.yml` (PostgreSQL on host port **5432**).
2. Run `npm run db:migrate` if not done.
3. Fix `app/api/todos/route.ts` so listing todos uses the correct Prisma field name for sorting.
4. Verify **GET /api/todos** returns `200` with a JSON array in Postman (after sign-in).

### Acceptance criteria

- No database connection error on `npm run dev`
- List todos works in browser and Postman
- Create todo still works (`POST /api/todos` returns `201`)

### Files allowed

- `.env`
- `app/api/todos/route.ts`

### Deliverable

- Git commit: `fix: database url and todo list query (Q1)`
- Screenshot: Postman GET /api/todos success

*(Lab notes / screenshot reference)*

---

---

## Q2. [15 pts] Authentication & Firebase Configuration

### Scenario

- Email/password login fails or cookies are not set correctly.
- **Sign in with Google** fails with Firebase configuration errors.

### Tasks

1. Fix `**BETTER_AUTH_URL`** and `**NEXT_PUBLIC_BETTER_AUTH_URL`** in `.env` (must use `**http://**` for local development).
2. Copy Firebase web app credentials into `.env` using the **correct variable names** (check `lib/firebase.ts`).
3. Test Google sign-in on `/login` — after signing in, you should be redirected to `**/todos`**.
4. Register/login with **email & password** (Better Auth) and access `/todos`.

### Acceptance criteria

- Google sign-in redirects to `/todos`
- Email login works and protects `/todos`

### Files allowed

- `.env`

### Deliverable

- Git commit: `fix: better auth and firebase env (Q2)`
- Screenshot: Google sign-in success + email login

*(Lab notes / screenshot reference)*

---

---

## Q3. [15 pts] Security, Validation & Authorization

### Scenario

- Empty todo titles can be saved via API.
- Any user can **update another user's todo** via `PUT /api/todos/[id]` without logging in.

### Tasks

1. Strengthen `**lib/validators/todo.ts`** so **title** cannot be empty.
2. Add proper **authentication and ownership checks** to `**PUT /api/todos/[id]`** (same pattern as GET/DELETE).
3. Run `**npm test`** until all tests pass.

### Acceptance criteria

- `npm test` — all green
- Unauthenticated `PUT /api/todos/[id]` returns **401**
- Empty title rejected (validation or **400** response)

### Files allowed

- `lib/validators/todo.ts`
- `app/api/todos/[id]/route.ts`

### Deliverable

- Git commit: `fix: todo validation and put authorization (Q3)`
- Screenshot: Postman PUT without auth returns 401 + `npm test` passed

*(Lab notes / screenshot reference)*

---

---

## Q4. [15 pts] Docker, Remote AI & Jest

### Scenario

- `npm test` fails on Ollama **HTTPS** or **model name** checks.
- **AI Suggest** button fails on the new todo page.
- `Dockerfile` exposes the wrong port.

### Tasks

1. Fix `**OLLAMA_BASE_URL`** to use **HTTPS**: `https://ollama.csbihub.id`
2. Fix `**OLLAMA_MODEL`** to `**gemma4:26b`**
3. Fix `**Dockerfile` EXPOSE** to match the application port (**3000**).
4. Pass `**npm test`**; test **AI Suggest** on the new todo page.

### Acceptance criteria

- All Jest tests pass
- AI returns suggestion text in the browser
- `Dockerfile` EXPOSE is correct
- `docker compose up -d --build` completes without build failure

### Files allowed

- `.env`
- `Dockerfile`

### Deliverable

- Git commit: `fix: ollama config and docker expose (Q4)`
- Screenshot: AI suggestion + Jest passed + Docker Desktop (running containers/images)

*(Lab notes / screenshot reference)*

---

---

## Submission Checklist


| #   | Item                                            | Done |
| --- | ----------------------------------------------- | ---- |
| 1   | Section 01 — all theory answers with references | ☐    |
| 2   | Section 02 — 4 Git commits (Q1–Q4)              | ☐    |
| 3   | Postman collection tested                       | ☐    |
| 4   | Screenshots (5+)                                | ☐    |


---

## Assessment Rubric


| Criteria                               | Excellent (90–100)                                 | Good (75–89)                           | Fair (60–74)                      | Poor (<60)                           |
| -------------------------------------- | -------------------------------------------------- | -------------------------------------- | --------------------------------- | ------------------------------------ |
| **API Testing & HTTP (S01-A, Lab Q1)** | Strong Postman workflow, HTTP codes, assertions    | Mostly correct, minor mistakes         | Partial API testing understanding | Cannot demonstrate basic API testing |
| **ORM, SQL & DB (S01-A, Lab Q1)**      | Correct ORM/SQL mapping, schema fixes, working API | Mostly correct, small issues           | Partial schema/ORM understanding  | Non-functional or major DB errors    |
| **Auth & JWT (S01-B, Lab Q2)**         | Clear JWT/session concepts + working auth flow     | Mostly correct, minor issues           | Basic but incomplete auth         | Incorrect or auth not working        |
| **Web Security (S01-C, Lab Q3)**       | Strong XSS/validation/proxy awareness + secure API | Mostly secure, minor gaps              | Partial security understanding    | Insecure or major gaps               |
| **Docker, CI/CD, AI (S01-D, Lab Q4)**  | Correct Docker/CI/CD/AI/testing + working config   | Mostly functional, minor config issues | Partial deployment understanding  | Deployment/testing largely incorrect |


---

*End of Quiz 02 — Variation B (Student Paper)*