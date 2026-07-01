import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";
import { API_PATHS } from "./apiConfig";
import type { Campaign, CampaignStatus } from "../types/campaign";

export interface CampaignPayload {
  name: string;
  objective: string;
  subjectLine: string;
  previewText: string;
  emailContent: string;
  ctaText: string;
  ctaUrl: string;
  audience: string;
  status: CampaignStatus;
}

export const fetchCampaigns = () =>
  apiGet<Campaign[]>(API_PATHS.campaign.base, "campaigns");

export const fetchCampaignById = (id: string) =>
  apiGet<Campaign>(API_PATHS.campaign.byId(id), "campaign");

export const createCampaignApi = (payload: CampaignPayload) =>
  apiPost<Campaign, CampaignPayload>(
    API_PATHS.campaign.base,
    payload,
    "campaign",
  );

export const updateCampaignApi = (
  id: string,
  payload: Partial<CampaignPayload>,
) =>
  apiPut<Campaign, Partial<CampaignPayload>>(
    API_PATHS.campaign.byId(id),
    payload,
    "campaign",
  );

export const deleteCampaignApi = (id: string) =>
  apiDelete<{ message: string }>(API_PATHS.campaign.byId(id));
