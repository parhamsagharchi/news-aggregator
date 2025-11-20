import type { AxiosRequestHeaders, AxiosRequestConfig } from "axios";

/**
 * Base problem interface for API errors
 */
export interface ApiProblem {
  title: string;
  status: number;
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
  config?: AxiosRequestConfig;
}

/**
 * Bad Request Error (400)
 */
export interface BadRequestError extends ApiProblem {
  type: "BadRequest";
}

/**
 * Validation Error (429 - Too Many Requests)
 */
export interface ValidationError extends ApiProblem {
  type: "Validation";
}

/**
 * Not Found Error (404)
 */
export interface NotFoundError extends ApiProblem {
  type: "NotFound";
}

/**
 * Server Error (500)
 */
export interface ServerError extends ApiProblem {
  type: "ServerError";
}

/**
 * Network Error (no response)
 */
export interface NetworkError extends ApiProblem {
  type: "NetworkError";
}

/**
 * Forbidden Error (403)
 */
export interface ForbiddenError extends ApiProblem {
  type: "Forbidden";
}

/**
 * Union type for all possible API errors
 */
export type ApiError =
  | BadRequestError
  | ValidationError
  | NotFoundError
  | ServerError
  | NetworkError
  | ForbiddenError;

/**
 * Options for API requests
 */
export interface ApiRequestOptions {
  headers?: AxiosRequestHeaders | Record<string, string>;
  baseURL?: string;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
}

