import mongoose, { Schema, Types } from "mongoose";
import {
  ACTION_TYPE,
  JOURNEY_TRIGGER,
  type ActionType,
  type JourneyTrigger,
} from "../constant/journey.js";

interface IJourneyAction {
  type: ActionType;
  campaignId?: Types.ObjectId;
  waitDuration?: number;
}

export interface IJourney {
  _id?: Types.ObjectId;

  name: string;

  trigger: JourneyTrigger;

  actions: IJourneyAction[];

  createdBy: Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

const actionSchema = new Schema<IJourneyAction>(
  {
    type: {
      type: String,
      enum: Object.values(ACTION_TYPE),
      required: true,
    },

    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },

    waitDuration: Number,
  },
  {
    _id: false,
  },
);

const journeySchema = new Schema<IJourney>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    trigger: {
      type: String,
      enum: Object.values(JOURNEY_TRIGGER),
      required: true,
    },

    actions: {
      type: [actionSchema],
      default: [],
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

export const Journey = mongoose.model<IJourney>("Journey", journeySchema);
