export type JourneyTrigger =
  | "USER_REGISTERED"
  | "SUBSCRIPTION_PURCHASED"
  | "WEBINAR_REGISTERED"
  | "VIDEO_COMPLETED";

export type ActionType = "SEND_EMAIL" | "WAIT";

export type ConditionType = "EMAIL_OPENED";

export interface JourneyOutcome {
  type: ActionType;
  campaignId?: string;
}

export interface JourneyCondition {
  type: ConditionType;
  onYes: JourneyOutcome;
  onNo: JourneyOutcome;
}

export interface JourneyAction {
  type: ActionType;
  campaignId?: string;
  waitDuration?: number;
  condition?: JourneyCondition;
}

export interface Journey {
  _id: string;
  name: string;
  trigger: JourneyTrigger;
  actions: JourneyAction[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
