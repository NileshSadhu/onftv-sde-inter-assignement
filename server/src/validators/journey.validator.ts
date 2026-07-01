import { z } from "zod";

import { ACTION_TYPE, JOURNEY_TRIGGER } from "../constant/journey.js";
import mongoose from "mongoose";

const actionSchema = z.object({
  type: z.enum(Object.values(ACTION_TYPE)),

  campaignId: z
    .string()
    .transform((id) => new mongoose.Types.ObjectId(id))
    .optional(),

  waitDuration: z.number().positive().optional(),
});

export const createJourneySchema = z.object({
  name: z.string().trim().min(3).max(100),

  trigger: z.enum(Object.values(JOURNEY_TRIGGER)),

  actions: z.array(actionSchema).default([]),
});

export const updateJourneySchema = createJourneySchema.partial();
