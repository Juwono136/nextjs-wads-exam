# WADS Practical Examination Materials

Web Application Development and Security — BINUS University International.

## Contents


| Project                              | Topic       | Exam                   | Docs                                                          |
| ------------------------------------ | ----------- | ---------------------- | ------------------------------------------------------------- |
| [final-exam-wads](./final-exam-wads) | Simple Blog | Offline lab, 120 min   | [Student paper](./final-exam-wads/docs/EXAM_STUDENT_PAPER.md) |
| [quiz-wads](./quiz-wads)             | Todo List   | Online laptop, 100 min | [Student paper](./quiz-wads/docs/EXAM_STUDENT_PAPER.md)       |


## Instructor resources

- [PACKAGING.md](./PACKAGING.md) — ZIP, git tags, verification
- Answer keys: `*/docs/EXAM_ANSWER_KEY.md` (do not distribute to students)
- Final offline setup: [INSTRUCTOR_OFFLINE_SETUP.md](./final-exam-wads/docs/INSTRUCTOR_OFFLINE_SETUP.md)
- Quiz setup: [INSTRUCTOR_QUIZ_SETUP.md](./quiz-wads/docs/INSTRUCTOR_QUIZ_SETUP.md)

## Tech stack (both projects)

Next.js 16, Better Auth, PostgreSQL + Prisma, REST API, Swagger, Postman, Jest, Docker.

- **Final exam:** local Ollama `phi3:mini`, no Firebase, no internet
- **Quiz:** Firebase Google auth, remote Ollama `https://ollama.csbihub.id` + `gemma4:26b`

Starter code includes **intentional bugs** aligned with each exam question.