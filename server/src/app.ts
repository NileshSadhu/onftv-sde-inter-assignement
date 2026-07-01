import express, { type Request, type Response } from "express";
import cors from "cors";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Health Check API is working fine.",
  });
});

import authRoute from "./routes/auth.route.js";
import campaignRoute from "./routes/Campaign.route.js";
import aiRoute from "./routes/ai.route.js";

app.use("/api/auth", authRoute);
app.use("/api/campaign", campaignRoute);
app.use("/api/ai", aiRoute);

export default app;
