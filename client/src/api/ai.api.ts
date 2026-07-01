import { apiPost } from "./apiClient";
import { API_PATHS } from "./apiConfig";

export interface GenerateEmailPayload {
  objective: string;
  audience: string;
  cta: string;
}

export interface GeneratedEmail {
  subjectLine: string;
  previewText: string;
  emailContent: string;
  ctaSuggestion: string;
}

export const generateCampaignEmailApi = (payload: GenerateEmailPayload) =>
  apiPost<GeneratedEmail, GenerateEmailPayload>(
    API_PATHS.ai.generateEmail,
    payload,
    "data",
  );
