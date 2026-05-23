# Simple Blog — WADS Final Exam Project

Full-stack blog application for the **WADS Practical Final Examination** (offline lab).

## Tech stack

- Next.js 16 + Node.js
- Better Auth (email/password)
- PostgreSQL + Prisma
- REST API + OpenAPI / Swagger
- Jest
- Docker & Docker Compose
- Ollama (**phi3:mini**, local, offline)

## Documentation

| Document | Audience |
|----------|----------|
| [START_HERE.md](./START_HERE.md) | Students (lab) |
| [docs/EXAM_STUDENT_PAPER.md](./docs/EXAM_STUDENT_PAPER.md) | Students (exam questions) |
| [docs/EXAM_ANSWER_KEY.md](./docs/EXAM_ANSWER_KEY.md) | Instructors only |
| [docs/INSTRUCTOR_OFFLINE_SETUP.md](./docs/INSTRUCTOR_OFFLINE_SETUP.md) | Instructors (ZIP packaging) |

## Scripts

```bash
npm run dev          # Development server
npm run db:generate  # Prisma client
npm run db:migrate   # Apply migrations
npm test             # Jest tests
docker compose up -d # PostgreSQL
```

## Exam note

The starter project contains **intentional defects** for examination tasks. See the student paper for what to fix.
