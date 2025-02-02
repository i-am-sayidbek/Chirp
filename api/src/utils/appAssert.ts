import assert from "node:assert";
import ErrorCode from "../constants/errorCode.js";
import { HttpStatusCode } from "../constants/http.js";
import AppError from "./appError.js";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  errorCode?: ErrorCode
) => asserts condition;

const appAssert: AppAssert = (condition, httpStatusCode, message, errorCode) =>
  assert(condition, new AppError(httpStatusCode, message, errorCode));

export default appAssert;
