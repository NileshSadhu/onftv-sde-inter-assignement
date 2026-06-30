import mongoose, { Schema, Types } from "mongoose";
import { CAMPAIGN_STATUS, type CampaignStatus } from "../constant/campaign.js";

export interface ICampaign {
  _id?: Types.ObjectId;

  name: string;
  objective: string;
  subjectLine: string;
  previewText: string;
  emailContent: string;
  ctaText: string;
  ctaUrl: string;
  audience: string;

  status: CampaignStatus;

  createdBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const campaignSchema = new Schema<ICampaign>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    objective: {
      type: String,
      trim: true,
      required: true,
    },

    subjectLine: {
      type: String,
      trim: true,
      required: true,
    },

    previewText: {
      type: String,
      trim: true,
      required: true,
    },

    emailContent: {
      type: String,
      trim: true,
      required: true,
    },

    ctaText: {
      type: String,
      trim: true,
      required: true,
    },

    ctaUrl: {
      type: String,
      trim: true,
      required: true,
    },

    audience: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(CAMPAIGN_STATUS),
      default: CAMPAIGN_STATUS.DRAFT,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);
