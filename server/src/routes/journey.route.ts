import { Router } from "express";

import checkUser from "../middleware/auth.middleware.js";

import {
  createJourney,
  deleteJourney,
  getJourneyById,
  getJourneys,
  updateJourney,
} from "../controllers/journey.controller.js";

const journeyRoute = Router();

journeyRoute.use(checkUser);

journeyRoute.post("/", createJourney);

journeyRoute.get("/", getJourneys);

journeyRoute.get("/:id", getJourneyById);

journeyRoute.put("/:id", updateJourney);

journeyRoute.delete("/:id", deleteJourney);

export default journeyRoute;
