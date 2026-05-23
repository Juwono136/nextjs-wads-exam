import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { handleApiError, unauthorizedResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createTodoSchema } from "@/lib/validators/todo";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const todos = await prisma.todo.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: todos });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const input = createTodoSchema.parse(body);

    /** EXAM Q1: wrong field ownerId — schema uses userId */
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        description: input.description,
        completed: input.completed ?? false,
        priority: input.priority ?? "MEDIUM",
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        ownerId: session.user.id,
      } as never,
    });

    return NextResponse.json({ data: todo }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
