# Instructor Guide — Quiz Setup

## Distribution

Students clone or download `quiz-wads` and work on personal laptops with **internet enabled**.

## Before quiz

1. Share Firebase project credentials (or ask students to use their own Firebase dev project).
2. Confirm remote Ollama is reachable: `curl https://ollama.csbihub.id/api/tags`
3. Verify model name `gemma4:26b` exists on server.

## Student setup

```bash
cp .env.example .env
# Fill Firebase + keep intentional bugs until exam
docker compose up -d
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

## Grading

Use `docs/EXAM_ANSWER_KEY.md`. Check:

- Git commits Q1–Q4
- Postman screenshots
- Jest output
- Google + email auth screenshots

## Tags

```bash
git tag student-quiz-v1.0
git tag solution-quiz-v1.0
```

---

*Instructor only*
