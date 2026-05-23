import { buildSummarizePrompt } from "@/lib/ollama";

describe("buildSummarizePrompt", () => {
  it("includes blog content in the prompt", () => {
    const content = "This is a sample blog post about web security.";
    const prompt = buildSummarizePrompt(content);
    expect(prompt).toContain(content);
    expect(prompt.toLowerCase()).toContain("summarize");
  });
});
