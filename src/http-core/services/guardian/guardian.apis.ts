import { fetchData } from "@/http-core/api/api.request";
import { createAxiosClient } from "@/http-core/api/api.axios";
import { apiKeys, baseURLs } from "@/http-core/config";

import type {
  IGetGuardianPayload,
  IGetGuardianResponse,
} from "./guardian.types";

/**
 * Map camelCase properties to Guardian API's hyphenated parameter names
 */
const mapGuardianParams = (
  params: IGetGuardianPayload
): Record<string, string | number | undefined> => {
  const paramMap: Record<string, string> = {
    fromDate: "from-date",
    toDate: "to-date",
    orderBy: "order-by",
    pageSize: "page-size",
    showFields: "show-fields",
    showTags: "show-tags",
  };

  const mapped: Record<string, string | number | undefined> = {
    "api-key": apiKeys.guardian,
  };

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const apiKey = paramMap[key] ?? key;
      mapped[apiKey] = value;
    }
  });

  return mapped;
};

export async function getGuardianArticle(
  params: IGetGuardianPayload,
  signal?: AbortSignal
): Promise<IGetGuardianResponse> {
  const mappedParams = mapGuardianParams(params);
  return await fetchData<IGetGuardianResponse>(
    "",
    { params: mappedParams, signal },
    createAxiosClient(baseURLs.guardianApi || "")
  );
}
