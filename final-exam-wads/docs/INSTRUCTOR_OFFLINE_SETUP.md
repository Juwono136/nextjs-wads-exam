# Instructor Guide — Offline Lab Packaging (Final Exam)

## Overview

Students receive a **ZIP archive** with **no internet** during the 2-hour exam. This guide explains how to prepare the package on a machine **with** internet, then deploy to lab PCs.

---

## 1. Prerequisites (preparation machine)

- Node.js 20 LTS
- Docker Desktop
- Ollama installed
- Git
- 7-Zip or similar (for ZIP creation)

---

## 2. Prepare the application

```bash
cd final-exam-wads
npm ci
npx prisma generate
cp .env.example .env
# Keep intentional exam bugs in .env — do NOT pre-fix for student ZIP
```

### Pull Docker images (offline-ready)

```bash
docker pull postgres:16-alpine
docker compose build
```

### Pull Ollama model (on each lab PC or golden image)

```bash
ollama pull phi3:mini
ollama list   # must show phi3:mini
```

---

## 3. ZIP package contents checklist

Include in `WADS-FinalExam-Student.zip`:

| Item | Required |
|------|----------|
| Full project source | Yes |
| `node_modules/` | **Yes** (critical — no npm install in exam) |
| `generated/prisma/` | **Yes** (run `npx prisma generate` before zipping) |
| `.env` from `.env.example` (buggy values) | Yes |
| `postman/Blog-WADS-Final.postman_collection.json` | Yes |
| `docs/EXAM_STUDENT_PAPER.md` | Yes (print or PDF optional) |
| `START_HERE.md` | Yes |
| **Exclude** `docs/EXAM_ANSWER_KEY.md` | Yes — instructor only |
| `.next/` | Optional (can build on lab if needed; prefer pre-built for speed) |

### Create ZIP (example PowerShell)

```powershell
Compress-Archive -Path "final-exam-wads\*" -DestinationPath "WADS-FinalExam-Student.zip"
```

Ensure archive size fits lab disk (node_modules is large).

---

## 4. Lab PC setup (day before exam)

For **each** lab computer:

1. Install Node 20, Docker Desktop, Ollama, VS Code, Postman (portable OK), Git.
2. Extract ZIP to `C:\Exam\final-exam-wads\`
3. Run `ollama pull phi3:mini` while internet is available.
4. Test **offline** (disable Wi-Fi/Ethernet):
   ```bash
   cd C:\Exam\final-exam-wads
   docker compose up -d
   npm run dev
   ```
5. Block outbound internet during exam (firewall group policy or unplug network).

---

## 5. Exam day script (examiner)

1. Distribute printed/paper exam from `docs/EXAM_STUDENT_PAPER.md`
2. Confirm Ollama service: `ollama serve` (or Windows service)
3. Confirm Docker: `docker compose up -d`
4. Remind students: **no npm install**, fix `.env` and code per questions
5. Collect: Git log export or USB + screenshots checklist

---

## 6. Troubleshooting

| Issue | Action |
|-------|--------|
| Prisma client missing | Run `npm run db:generate` (works offline if generated folder included) |
| Ollama timeout | Check `ollama list`, restart `ollama serve` |
| Docker port in use | Stop other Postgres instances |
| Better Auth cookie fail | Ensure HTTP (not HTTPS) URLs in `.env` after Q2 fix |

---

## 7. Grading

Use `docs/EXAM_ANSWER_KEY.md` rubrics (100 points total).

---

*Instructor confidential*
