import type { Request, Response } from "express";

import { HTTP_STATUS } from "../constant/httpStatus.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  generateEmailSchema,
  validateGeminiResponse,
} from "../validators/ai.validator.js";

import { generateEmail } from "../services/ai.service.js";

export const generateCampaignEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { objective, audience, cta } = generateEmailSchema.parse(req.body);

    const aiResponse = await generateEmail(objective, audience, cta);

    const generatedEmail = validateGeminiResponse.parse(aiResponse);

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Email generated successfully.",
      data: generatedEmail,
    });
  },
);
