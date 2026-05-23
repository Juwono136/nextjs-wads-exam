import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  handleApiError,
  unauthorizedResponse,
} from "@/lib/api-error";
import { buildSummarizePrompt, generateWithOllama } from "@/lib/ollama";

const summarizeSchema = z.object({
  content: z.string().min(10, "Content must be at least 10 characters"),
});

/** EXAM Q4: request body omits model — relies on broken OLLAMA_BASE_URL in .env */
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { content } = summarizeSchema.parse(body);

    const prompt = buildSummarizePrompt(content);
    const summary = await generateWithOllama(prompt);

    return NextResponse.json({
      data: {
        summary,
        model: process.env.OLLAMA_MODEL,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "AI request timed out. Is Ollama running locally?" },
        { status: 504 }
      );
    }
    return handleApiError(error);
  }
}
