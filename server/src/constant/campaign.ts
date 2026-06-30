export const CAMPAIGN_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
} as const;

export type CampaignStatus =
  (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];
