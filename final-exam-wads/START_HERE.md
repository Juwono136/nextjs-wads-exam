# START HERE — WADS Final Exam (Offline Lab)

## Quick start

1. Open terminal in this folder.
2. Start database only (works **offline** — does not build the app image):
   ```bash
   docker compose up -d
   ```
   You should see only **blog_exam_db** (postgres). Do **not** use `docker compose --profile full` during the exam (that requires internet to run `npm ci` inside Docker).
3. Start app locally:
   ```bash
   npm run dev
   ```
4. Open browser: **http://localhost:3000**
5. Read exam tasks in `docs/EXAM_STUDENT_PAPER.md`

## Important

- **No internet** during the exam.
- Do **not** run `npm install` unless the examiner says so.
- Ollama must be running locally with model **phi3:mini**.

## Helpful commands

```bash
npm run db:generate
npm run db:migrate
npm test
ollama list
docker compose ps
```

## API testing

- Postman collection: `postman/Blog-WADS-Final.postman_collection.json`
- API docs: fix the link in Task 2, then open Swagger UI

Good luck!
