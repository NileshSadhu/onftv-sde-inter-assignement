import mongoose, { Schema, Types } from "mongoose";
import {
  ACTION_TYPE,
  JOURNEY_TRIGGER,
  CONDITION_TYPE,
  type ActionType,
  type JourneyTrigger,
  type ConditionType,
} from "../constant/journey.js";

interface IJourneyOutcome {
  type: ActionType;
  campaignId?: Types.ObjectId;
}

interface IJourneyCondition {
  type: ConditionType;
  onYes: IJourneyOutcome;
  onNo: IJourneyOutcome;
}

interface IJourneyAction {
  type: ActionType;
  campaignId?: Types.ObjectId;
  waitDuration?: number;
  condition?: IJourneyCondition;
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

const outcomeSchema = new Schema<IJourneyOutcome>(
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
  },
  {
    _id: false,
  },
);

const conditionSchema = new Schema<IJourneyCondition>(
  {
    type: {
      type: String,
      enum: Object.values(CONDITION_TYPE),
      required: true,
    },

    onYes: {
      type: outcomeSchema,
      required: true,
    },

    onNo: {
      type: outcomeSchema,
      required: true,
    },
  },
  {
    _id: false,
  },
);

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

    condition: {
      type: conditionSchema,
      required: false,
    },
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
