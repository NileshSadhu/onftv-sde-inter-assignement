import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Campaign } from "../models/campaign.model.js";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "../validators/campaign.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const createCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const data = req.body;
    const campaignData = createCampaignSchema.parse(data);

    const campaign = await Campaign.create({
      ...campaignData,
      createdBy: req.user.id,
    });

    return res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Campaign created successfully.",
      campaign,
    });
  },
);

export const getCampaigns = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const campaigns = await Campaign.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      count: campaigns.length,
      campaigns,
    });
  },
);

export const getCampaignById = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const { id } = req.params;

    if (!id || Array.isArray(id) || !isValidObjectId(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid campaign id.");
    }

    const campaign = await Campaign.findOne({
      _id: id,
      createdBy: req.user.id,
    });

    if (!campaign) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Campaign not found.");
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      campaign,
    });
  },
);

export const updateCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const { id } = req.params;

    if (!id || Array.isArray(id) || !isValidObjectId(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid campaign id.");
    }

    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No update data provided.");
    }

    const campaignData = updateCampaignSchema.parse(data);

    const campaign = await Campaign.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user.id,
      },
      campaignData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!campaign) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Campaign not found.");
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Campaign updated successfully.",
      campaign,
    });
  },
);

export const deleteCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const { id } = req.params;

    if (!id || Array.isArray(id) || !isValidObjectId(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid campaign id.");
    }

    const campaign = await Campaign.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!campaign) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Campaign not found.");
    }

    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  },
);
