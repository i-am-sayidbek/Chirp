import { ErrorRequestHandler, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http.js";
import AppError from "../utils/appError.js";
import { NODE_ENV } from "../constants/env.js";

const handleAppError = (res: Response, err: AppError) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  });
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (NODE_ENV !== "production") {
    console.log(`Path: ${err.path}`, err);
  }

  if (err instanceof AppError) {
    return handleAppError(res, err);
  }

  res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
