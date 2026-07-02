import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";
import { API_PATHS } from "./apiConfig";
import type { Journey, JourneyAction, JourneyTrigger } from "../types/journey";

export interface JourneyPayload {
  name: string;
  trigger: JourneyTrigger;
  actions: JourneyAction[];
}

export const fetchJourneys = () =>
  apiGet<Journey[]>(API_PATHS.journey.base, "journeys");

export const fetchJourneyById = (id: string) =>
  apiGet<Journey>(API_PATHS.journey.byId(id), "journey");

export const createJourneyApi = (payload: JourneyPayload) =>
  apiPost<Journey, JourneyPayload>(API_PATHS.journey.base, payload, "journey");

export const updateJourneyApi = (
  id: string,
  payload: Partial<JourneyPayload>,
) =>
  apiPut<Journey, Partial<JourneyPayload>>(
    API_PATHS.journey.byId(id),
    payload,
    "journey",
  );

export const deleteJourneyApi = (id: string) =>
  apiDelete<{ message: string }>(API_PATHS.journey.byId(id));
