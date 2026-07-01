import { Router } from "express";
import authRoute from "./auth.route.js";
import campaignRoute from "./campaign.route.js";
import aiRoute from "./ai.route.js";
import journeyRoute from "./journey.route.js";

const mainRoute = Router();

mainRoute.use("/auth", authRoute);
mainRoute.use("/campaign", campaignRoute);
mainRoute.use("/ai", aiRoute);
mainRoute.use("/journey", journeyRoute);

export default mainRoute;
