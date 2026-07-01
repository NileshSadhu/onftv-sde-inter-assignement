import { Router } from "express";
import checkUser from "../middleware/auth.middleware.js";
import { generateCampaignEmail } from "../controllers/ai.controller.js";

const aiRoute = Router();

aiRoute.post("/generate-email", checkUser, generateCampaignEmail);

export default aiRoute;
