import { Router } from "express";

import checkUser from "../middleware/auth.middleware.js";

import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaign.controller.js";

const campaignRoute = Router();

campaignRoute.use(checkUser);

campaignRoute.post("/", createCampaign);

campaignRoute.get("/", getCampaigns);

campaignRoute.get("/:id", getCampaignById);

campaignRoute.put("/:id", updateCampaign);

campaignRoute.delete("/:id", deleteCampaign);

export default campaignRoute;
