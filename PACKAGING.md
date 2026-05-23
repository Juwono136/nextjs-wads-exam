# WADS Exam Repository — Packaging & Git Tags

## Projects

| Folder | Exam | Duration | Internet |
|--------|------|----------|----------|
| `final-exam-wads` | Final (Blog) | 120 min | No |
| `quiz-wads` | Quiz (Todo) | 100 min | Yes |

## Git tags (recommended)

Create from **student buggy** state before distributing solutions:

```bash
# Final exam
cd final-exam-wads
git tag -a student-v1.0 -m "Student starter with intentional bugs"
# After applying all fixes from docs/EXAM_ANSWER_KEY.md:
git tag -a solution-v1.0 -m "Reference solution"

# Quiz
cd ../quiz-wads
git tag -a student-quiz-v1.0 -m "Quiz starter with intentional bugs"
git tag -a solution-quiz-v1.0 -m "Quiz reference solution"
```

## Final exam offline ZIP

See [final-exam-wads/docs/INSTRUCTOR_OFFLINE_SETUP.md](./final-exam-wads/docs/INSTRUCTOR_OFFLINE_SETUP.md).

**Must include:** `node_modules/`, `generated/prisma/`, `.env` (buggy), Postman collection.

**Exclude from student ZIP:** `docs/EXAM_ANSWER_KEY.md`

## Quiz distribution

Students clone repo or receive ZIP with `npm install` allowed.

**Exclude:** `quiz-wads/docs/EXAM_ANSWER_KEY.md`

## Verification checklist

```bash
# Final — expect 2 failing tests (Q3) until fixed
cd final-exam-wads && npm test

# Quiz — expect 2 failing tests (Q3, Q4) until fixed
cd quiz-wads && npm test

# Build (may require DB for some routes at build time — Next should build)
npm run build
```

## Exam documents (English, Word-ready)

- `final-exam-wads/docs/EXAM_STUDENT_PAPER.md`
- `final-exam-wads/docs/EXAM_ANSWER_KEY.md` (instructor)
- `quiz-wads/docs/EXAM_STUDENT_PAPER.md`
- `quiz-wads/docs/EXAM_ANSWER_KEY.md` (instructor)
