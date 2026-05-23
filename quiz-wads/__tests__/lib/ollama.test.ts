import { buildSuggestPrompt } from "@/lib/ollama";

describe("buildSuggestPrompt", () => {
  it("includes the todo title in the prompt", () => {
    const prompt = buildSuggestPrompt("Study for WADS quiz");
    expect(prompt).toContain("Study for WADS quiz");
  });

  it("uses HTTPS base URL from environment", () => {
    // EXAM Q4: fails when OLLAMA_BASE_URL is http — students fix .env to https
    const base = process.env.OLLAMA_BASE_URL ?? "";
    expect(base.startsWith("https://")).toBe(true);
  });
});
