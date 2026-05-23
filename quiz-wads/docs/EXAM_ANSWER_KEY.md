# WADS Quiz — Answer Key (Instructor Only)

---

## Defect summary

| Q | Location | Bug | Fix |
|---|----------|-----|-----|
| 1 | `app/api/todos/route.ts` | `ownerId` instead of `userId` | Use `userId: session.user.id` |
| 2 | `.env.example` / `.env` | `NEXT_PUBLIC_FIREBASE_API_KY` typo | Rename to `API_KEY` |
| 3 | `validators/todo.ts`, DELETE route | No title min; no auth on DELETE | `.min(1)` + session check |
| 4 | `.env`, `Dockerfile` | `http://` Ollama; `EXPOSE 4000` | `https://ollama.csbihub.id`; `EXPOSE 3000` |

---

## Q1 Solution

**`app/api/todos/route.ts`:**

```typescript
const todo = await prisma.todo.create({
  data: {
    title: input.title,
    description: input.description,
    completed: input.completed ?? false,
    priority: input.priority ?? "MEDIUM",
    dueDate: input.dueDate ? new Date(input.dueDate) : null,
    userId: session.user.id,
  },
});
```

Remove `as never` cast.

---

## Q2 Solution

```env
NEXT_PUBLIC_FIREBASE_API_KEY="your-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
# ... other Firebase vars
```

`lib/firebase.ts` reads `NEXT_PUBLIC_FIREBASE_API_KEY` — names must match exactly.

---

## Q3 Solution

**`lib/validators/todo.ts`:**

```typescript
title: z.string().min(1, "Title is required").max(200),
```

**`app/api/todos/[id]/route.ts` DELETE:**

```typescript
export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return unauthorizedResponse();

  const existing = await prisma.todo.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!existing) return notFoundResponse("Todo not found");

  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Todo deleted" });
}
```

---

## Q4 Solution

```env
OLLAMA_BASE_URL="https://ollama.csbihub.id"
OLLAMA_MODEL="gemma4:26b"
```

**`Dockerfile`:** `EXPOSE 3000`

Run tests with env loaded:

```bash
OLLAMA_BASE_URL=https://ollama.csbihub.id npm test
```

---

## Rubric (100 pts)

4 × 25 points per question as listed in student paper.

---

*Confidential — instructors only*
