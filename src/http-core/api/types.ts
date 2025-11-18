import type { AxiosRequestHeaders, AxiosRequestConfig } from "axios";

interface Problem {
  title: string;
  status: number;
  detail?: string;
  message?: string;
  errors?: Record<string, string[]>;
  config?: AxiosRequestConfig;
}

interface BadRequestError extends Problem {
  type: "BadRequest";
}

interface ValidationError extends Problem {
  type: "Validation";
}

interface NotFoundError extends Problem {
  type: "NotFound";
}

interface UnhandledException extends Problem {
  type: "UnhandledException";
}

interface NetworkError extends Problem {
  type: "NetworkError";
}

interface ForbiddenError extends Problem {
  type: "Forbidden";
}

type ApiError =
  | BadRequestError
  | ValidationError
  | NotFoundError
  | UnhandledException
  | NetworkError
  | ForbiddenError;

type ApiOptions = {
  headers?: AxiosRequestHeaders | any;
  baseURL?: string;
  params?: Record<string, any>;
};

export type {
  ForbiddenError,
  ApiOptions,
  Problem,
  BadRequestError,
  ValidationError,
  NotFoundError,
  UnhandledException,
  NetworkError,
  ApiError,
};
