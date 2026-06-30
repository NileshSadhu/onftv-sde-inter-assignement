import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = registerSchema.parse(req.body);

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser?.email === email) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Email is already registered");
  }

  if (existingUser?.username === username) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Username is already taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = generateToken(newUser._id.toString());

  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});
