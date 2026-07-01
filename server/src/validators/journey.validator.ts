import { z } from "zod";

import {
  ACTION_TYPE,
  JOURNEY_TRIGGER,
  CONDITION_TYPE,
} from "../constant/journey.js";
import mongoose from "mongoose";

const objectIdString = z
  .string()
  .transform((id) => new mongoose.Types.ObjectId(id));

const outcomeSchema = z.object({
  type: z.enum(Object.values(ACTION_TYPE)),
  campaignId: objectIdString.optional(),
});

const conditionSchema = z.object({
  type: z.enum(Object.values(CONDITION_TYPE)),
  onYes: outcomeSchema,
  onNo: outcomeSchema,
});

const actionSchema = z.object({
  type: z.enum(Object.values(ACTION_TYPE)),

  campaignId: objectIdString.optional(),

  waitDuration: z.number().positive().optional(),

  condition: conditionSchema.optional(),
});

export const createJourneySchema = z.object({
  name: z.string().trim().min(3).max(100),

  trigger: z.enum(Object.values(JOURNEY_TRIGGER)),

  actions: z.array(actionSchema).default([]),
});

export const updateJourneySchema = createJourneySchema.partial();
