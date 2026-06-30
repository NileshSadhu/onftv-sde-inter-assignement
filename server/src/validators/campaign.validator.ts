import { z } from "zod";
import { CAMPAIGN_STATUS } from "../constant/campaign.js";

export const createCampaignSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Campaign name must be at least 3 characters long")
    .max(100, "Campaign name cannot exceed 100 characters"),

  objective: z
    .string()
    .trim()
    .min(10, "Campaign objective must be at least 10 characters long")
    .max(500),

  subjectLine: z.string().trim().min(3, "Subject line is required").max(150),

  previewText: z.string().trim().min(3, "Preview text is required").max(200),

  emailContent: z.string().trim().min(10, "Email content is required"),

  ctaText: z.string().trim().min(2, "CTA text is required").max(50),

  ctaUrl: z.string().trim().url("Please provide a valid URL"),

  audience: z.string().trim().min(2, "Audience is required").max(100),

  status: z.enum([CAMPAIGN_STATUS.DRAFT, CAMPAIGN_STATUS.PUBLISHED]),
});

export const updateCampaignSchema = createCampaignSchema.partial();
