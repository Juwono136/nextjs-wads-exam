import { createPostSchema } from "@/lib/validators/post";

describe("createPostSchema", () => {
  it("rejects empty title", () => {
    const result = createPostSchema.safeParse({
      title: "",
      content: "Valid content",
    });
    // EXAM Q3: currently passes — students must add .min(1) on title
    expect(result.success).toBe(false);
  });

  it("accepts valid post input", () => {
    const result = createPostSchema.safeParse({
      title: "My first post",
      content: "Hello blog world",
      published: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty content", () => {
    const result = createPostSchema.safeParse({
      title: "Title",
      content: "",
    });
    expect(result.success).toBe(false);
  });
});
