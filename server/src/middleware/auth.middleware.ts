import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

const checkUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authorization header missing or invalid",
      );
    }

    const token = authHeader.split(" ")[1]! as string;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded.id) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token payload");
    }

    req.user.id = decoded.id;

    next();
  },
);

export default checkUser;
