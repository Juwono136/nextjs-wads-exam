# WADS Practical Quiz — Student Paper

---

## Examination Header

| Field | Detail |
|-------|--------|
| **Course** | Web Application Development and Security (WADS) |
| **Program** | Computer Science — BINUS University International |
| **Semester** | 5 |
| **Exam Type** | Practical Quiz (Take-home / Lab on laptop) |
| **Project** | Todo List Web Application |
| **Duration** | 100 minutes |
| **Total Questions** | 4 (Easy) |
| **Total Points** | 100 |
| **Internet** | **Allowed** |

---

## Important Rules

1. You may use the internet (npm, Firebase Console docs, Ollama remote API).
2. Work on your own laptop with the provided `quiz-wads` project.
3. Use Git for version control; submit commits and screenshots.
4. Sessions covered: **7–11** (Database, Auth, Security, Docker, AI).

---

## Environment Checklist

- [ ] Node.js 20+
- [ ] Docker Desktop
- [ ] `.env` configured (copy from `.env.example`)
- [ ] Firebase project credentials (Google sign-in)
- [ ] Internet access to `https://ollama.csbihub.id`

---

## Startup

```bash
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Open: `http://localhost:3000`

---

## Question 1 — Database & REST API (Easy)

**Points:** 25 | **Time:** ~25 min | **Sessions:** 7

### Scenario

Creating a todo via UI or Postman fails with a Prisma error mentioning an unknown field.

### Tasks

1. Run `npm run db:migrate` if not done.
2. Fix `app/api/todos/route.ts` so new todos are stored with the correct user relation field.
3. Verify **POST /api/todos** returns `201` in Postman.

### Acceptance criteria

- [ ] Create todo works in browser and Postman
- [ ] List todos shows the new item

### Files allowed

- `app/api/todos/route.ts`

### Deliverable

- Git commit: `fix: todo create user relation (Q1)`
- Screenshot: Postman Create + List success

---

## Question 2 — Authentication & Firebase (Easy)

**Points:** 25 | **Time:** ~25 min | **Sessions:** 8

### Scenario

**Sign in with Google** fails with Firebase configuration errors.

### Tasks

1. Copy Firebase web app credentials into `.env` using the correct variable names.
2. Ensure all `NEXT_PUBLIC_FIREBASE_*` keys match `lib/firebase.ts`.
3. Test Google sign-in on `/login` (success message with your email).
4. Register/login with **email & password** (Better Auth) and access `/todos`.

### Acceptance criteria

- [ ] Google button shows successful sign-in message
- [ ] Email login works and protects `/todos`

### Files allowed

- `.env`

### Deliverable

- Git commit: `fix: firebase environment variables (Q2)`
- Screenshot: Google sign-in success

---

## Question 3 — Security & Validation (Easy)

**Points:** 25 | **Time:** ~25 min | **Sessions:** 9

### Scenario

- Empty todo titles can be saved
- Any user can delete another user's todo via API without logging in

### Tasks

1. Strengthen `lib/validators/todo.ts` so title cannot be empty.
2. Add proper authentication and ownership checks to **`DELETE /api/todos/[id]`**.
3. Run `npm test` until all tests pass.

### Acceptance criteria

- [ ] `npm test` all green
- [ ] Unauthenticated DELETE returns `401`

### Files allowed

- `lib/validators/todo.ts`
- `app/api/todos/[id]/route.ts`

### Deliverable

- Git commit: `fix: todo validation and delete auth (Q3)`

---

## Question 4 — Docker, Remote AI & Jest (Easy)

**Points:** 25 | **Time:** ~25 min | **Sessions:** 10, 11

### Scenario

- `npm test` fails on Ollama HTTPS check
- AI Suggest button fails
- Dockerfile exposes wrong port

### Tasks

1. Fix `OLLAMA_BASE_URL` to use **HTTPS** remote server: `https://ollama.csbihub.id`
2. Confirm `OLLAMA_MODEL=gemma4:26b`
3. Fix `Dockerfile` **EXPOSE** to match application port (`3000`)
4. Pass `npm test`; test **AI Suggest** on new todo page

### Acceptance criteria

- [ ] All Jest tests pass
- [ ] AI returns suggestion text
- [ ] Dockerfile EXPOSE is correct

### Files allowed

- `.env`
- `Dockerfile`

### Deliverable

- Git commit: `fix: ollama https and docker expose (Q4)`
- Screenshot: AI suggestion + Jest passed

---

## Submission Checklist

| Item | Done |
|------|------|
| 4 Git commits (Q1–Q4) | ☐ |
| Postman collection run | ☐ |
| Screenshots (5+) | ☐ |

**Student ID:** ____________________  
**Name:** ____________________  
**Date:** ____________________

---

*End of quiz paper*
