import toast from "react-hot-toast";

import type {
  ApiError,
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
  ForbiddenError,
  ValidationError,
} from "./api.types";

/**
 * Handler function type for API errors
 */
export type ApiErrorHandler = (errorData: ApiError) => void;

/**
 * Handles 400 Bad Request errors
 */
export const handleBadRequest: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Bad request. Please check your input.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as BadRequestError;
};

/**
 * Handles 404 Not Found errors
 */
export const handleNotFound: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Resource not found.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as NotFoundError;
};

/**
 * Handles 403 Forbidden errors
 */
export const handleForbidden: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Access forbidden.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
    type: "Forbidden",
  } as ForbiddenError;
};

/**
 * Handles 429 Too Many Requests errors
 */
export const handleTooManyRequests: ApiErrorHandler = (errorData) => {
  const message =
    errorData.message || "Too many requests. Please try again later.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
    type: "Validation",
  } as ValidationError;
};

/**
 * Handles 500 Server errors
 */
export const handleServerError: ApiErrorHandler = (errorData) => {
  const message = errorData.message || "Server error. Please try again later.";
  toast.error(message);
  throw {
    ...errorData,
    detail: message,
  } as ServerError;
};

/**
 * Handles network errors (no response from server)
 */
export const handleNetworkError = (): never => {
  const message = "Network error. Please check your connection.";
  toast.error(message);
  throw {
    detail: message,
    type: "NetworkError",
  } as NetworkError;
};

/**
 * Map of HTTP status codes to their corresponding error handlers
 */
export const errorHandlers: Record<number, ApiErrorHandler> = {
  400: handleBadRequest,
  403: handleForbidden,
  404: handleNotFound,
  429: handleTooManyRequests,
  500: handleServerError,
};

