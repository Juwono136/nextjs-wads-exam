import { z } from "zod";

/** EXAM Q3: title allows empty string — students must add .min(1) */
export const createPostSchema = z.object({
  title: z.string(),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().optional().default(false),
});

export const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
