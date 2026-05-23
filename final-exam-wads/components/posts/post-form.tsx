"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PostFormProps = {
  initialTitle?: string;
  initialContent?: string;
  initialPublished?: boolean;
  postId?: string;
};

export function PostForm({
  initialTitle = "",
  initialContent = "",
  initialPublished = false,
  postId,
}: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [published, setPublished] = useState(initialPublished);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  async function handleSummarize() {
    if (content.length < 10) {
      setError("Write at least 10 characters before summarizing.");
      return;
    }
    setAiLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "AI summarize failed");
      }
      setSummary(json.data.summary);
    } catch (e) {
      setError(e instanceof Error ? e.message : "AI summarize failed");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error ?? "Save failed");
      }
      router.push("/posts");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          className="min-h-[160px] w-full rounded-md border px-3 py-2 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published
      </label>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : postId ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={aiLoading}
          onClick={handleSummarize}
        >
          {aiLoading ? "Summarizing..." : "Summarize with AI"}
        </Button>
      </div>
      {summary && (
        <div className="rounded-md border bg-muted/40 p-3 text-sm">
          <p className="mb-1 font-medium">AI Summary</p>
          <p>{summary}</p>
        </div>
      )}
    </form>
  );
}
