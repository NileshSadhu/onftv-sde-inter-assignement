export const JOURNEY_TRIGGER = {
  USER_REGISTERED: "USER_REGISTERED",
  SUBSCRIPTION_PURCHASED: "SUBSCRIPTION_PURCHASED",
  WEBINAR_REGISTERED: "WEBINAR_REGISTERED",
  VIDEO_COMPLETED: "VIDEO_COMPLETED",
} as const;

export type JourneyTrigger =
  (typeof JOURNEY_TRIGGER)[keyof typeof JOURNEY_TRIGGER];

export const ACTION_TYPE = {
  SEND_EMAIL: "SEND_EMAIL",
  WAIT: "WAIT",
} as const;

export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];

export const CONDITION_TYPE = {
  EMAIL_OPENED: "EMAIL_OPENED",
} as const;

export type ConditionType =
  (typeof CONDITION_TYPE)[keyof typeof CONDITION_TYPE];
