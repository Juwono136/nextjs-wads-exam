import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  handleApiError,
  notFoundResponse,
  unauthorizedResponse,
} from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { updatePostSchema } from "@/lib/validators/post";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const post = await prisma.post.findFirst({
      where: { id, authorId: session.user.id },
    });

    if (!post) {
      return notFoundResponse("Post not found");
    }

    return NextResponse.json({ data: post });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const existing = await prisma.post.findFirst({
      where: { id, authorId: session.user.id },
    });
    if (!existing) {
      return notFoundResponse("Post not found");
    }

    const body = await request.json();
    const input = updatePostSchema.parse(body);

    const post = await prisma.post.update({
      where: { id },
      data: input,
    });

    return NextResponse.json({ data: post });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const existing = await prisma.post.findFirst({
      where: { id, authorId: session.user.id },
    });
    if (!existing) {
      return notFoundResponse("Post not found");
    }

    await prisma.post.delete({ where: { id } });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return handleApiError(error);
  }
}
