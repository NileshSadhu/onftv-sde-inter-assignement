import { z } from "zod";

export const generateEmailSchema = z.object({
  objective: z
    .string()
    .trim()
    .min(10, "Objective must be at least 10 characters long.")
    .max(500),

  audience: z.string().trim().min(2, "Audience is required").max(100),

  cta: z.string().trim().min(2, "CTA is Required").max(50),
});

export const validateGeminiResponse = z.object({
  subjectLine: z.string().min(1),

  previewText: z.string().min(1),

  emailContent: z.string().min(1),

  ctaText: z.string().min(1),
});
