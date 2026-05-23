const DEFAULT_TIMEOUT_MS = 60_000;

export type OllamaGenerateResponse = {
  model: string;
  response: string;
  done: boolean;
};

/** EXAM Q4: callers must pass model; default env may point to wrong host in .env */
export async function generateWithOllama(
  prompt: string,
  options?: { model?: string; baseUrl?: string }
): Promise<string> {
  const baseUrl =
    options?.baseUrl ?? process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434";
  const model = options?.model ?? process.env.OLLAMA_MODEL ?? "phi3:mini";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Ollama error ${res.status}: ${text}`);
    }

    const data = (await res.json()) as OllamaGenerateResponse;
    return data.response?.trim() ?? "";
  } finally {
    clearTimeout(timeout);
  }
}

export function buildSummarizePrompt(content: string): string {
  return `Summarize the following blog post in 2-3 sentences. Be concise.\n\n${content}`;
}
