import type { Request, Response } from "express";
import mongoose from "mongoose";

import { Journey } from "../models/journey.model.js";
import {
  createJourneySchema,
  updateJourneySchema,
} from "../validators/journey.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import { HTTP_STATUS } from "../constant/httpStatus.js";

const getValidId = (param: string | string[] | undefined): string => {
  if (
    !param ||
    Array.isArray(param) ||
    !mongoose.Types.ObjectId.isValid(param)
  ) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid journey id.");
  }
  return param;
};

export const createJourney = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const data = req.body;
    const body = createJourneySchema.parse(data);

    const journey = await Journey.create({
      ...body,
      createdBy: new mongoose.Types.ObjectId(req.user.id),
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Journey created successfully.",
      journey,
    });
  },
);

export const getJourneys = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
  }

  const journeys = await Journey.find({
    createdBy: req.user.id,
  }).populate("actions.campaignId", "name");

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: journeys.length,
    journeys,
  });
});

export const getJourneyById = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const id = getValidId(req.params.id);

    const journey = await Journey.findOne({
      _id: id,
      createdBy: req.user.id,
    }).populate("actions.campaignId", "name");

    if (!journey) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Journey not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      journey,
    });
  },
);

export const updateJourney = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const id = getValidId(req.params.id);

    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "No update data provided.");
    }

    const body = updateJourneySchema.parse(data);

    const journey = await Journey.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user.id,
      },
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!journey) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Journey not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Journey updated successfully.",
      journey,
    });
  },
);

export const deleteJourney = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Unauthorized request.");
    }

    const id = getValidId(req.params.id);

    const journey = await Journey.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!journey) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Journey not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Journey deleted successfully.",
    });
  },
);
