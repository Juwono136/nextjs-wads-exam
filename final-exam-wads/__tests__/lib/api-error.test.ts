import { ZodError, z } from "zod";
import { validationErrorResponse } from "@/lib/api-error";

describe("validationErrorResponse", () => {
  it("returns 400 for validation errors", () => {
    const schema = z.object({ title: z.string().min(1) });
    const parsed = schema.safeParse({ title: "" });
    if (parsed.success) {
      throw new Error("expected validation failure");
    }
    const response = validationErrorResponse(parsed.error);
    // EXAM Q3: currently 500 — students must change to 400
    expect(response.status).toBe(400);
  });

  it("includes field errors in body", async () => {
    const schema = z.object({ title: z.string().min(1) });
    const parsed = schema.safeParse({ title: "" });
    if (parsed.success) throw new Error("expected fail");
    const response = validationErrorResponse(parsed.error);
    const body = await response.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toBeDefined();
  });
});
