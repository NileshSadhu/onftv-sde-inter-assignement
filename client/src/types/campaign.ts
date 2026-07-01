export type CampaignStatus = "Draft" | "Published";

export interface Campaign {
  _id: string;
  name: string;
  objective: string;
  subjectLine: string;
  previewText: string;
  emailContent: string;
  ctaText: string;
  ctaUrl: string;
  audience: string;
  status: CampaignStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
