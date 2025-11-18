import toast from "react-hot-toast";

import type {
  ApiError,
  BadRequestError,
  NetworkError,
  NotFoundError,
  UnhandledException,
  ForbiddenError,
  ValidationError,
} from "./types";

export type ApiErrorHandler = (errorData: ApiError) => void;

export const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Bad request. Please check your input.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as BadRequestError;
};

export const notFoundErrorStrategy: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Resource not found.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as NotFoundError;
};

export const forbiddenErrorStrategy: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Access forbidden.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
    type: "Forbidden",
  } as ForbiddenError;
};

export const tooManyRequestsErrorStrategy: ApiErrorHandler = (errorData) => {
  const message =
    errorData.message || "Too many requests. Please try again later.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
    type: "Validation",
  } as ValidationError;
};

export const unhandledExceptionStrategy: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Server error. Please try again later.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as UnhandledException;
};

export const networkErrorStrategy = () => {
  const message = "Network error. Please check your connection.";
  toast.error(message);
  throw {
    detail: message,
  } as NetworkError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  400: badRequestErrorStrategy,
  403: forbiddenErrorStrategy,
  404: notFoundErrorStrategy,
  429: tooManyRequestsErrorStrategy,
  500: unhandledExceptionStrategy,
};
