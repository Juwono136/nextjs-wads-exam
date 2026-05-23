import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  handleApiError,
  unauthorizedResponse,
} from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createPostSchema } from "@/lib/validators/post";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const posts = await prisma.post.findMany({
      where: { authorId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ data: posts });
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
    const input = createPostSchema.parse(body);

    const post = await prisma.post.create({
      data: {
        title: input.title,
        content: input.content,
        published: input.published ?? false,
        authorId: session.user.id,
      },
    });

    return NextResponse.json({ data: post }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
