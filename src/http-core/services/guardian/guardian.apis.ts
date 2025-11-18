import { readData } from "@/http-core/api/api-base";
import { apiKeys } from "@/http-core/config";
import { ENewsSource } from "@/store/store.enum";

import type {
  IGetGuardianPayload,
  IGetGuardianResponse,
} from "./guardian.types";

/**
 * Map camelCase properties to Guardian API's hyphenated parameter names
 * Follows KISS principle with simple mapping logic
 */
const mapGuardianParams = (
  params: IGetGuardianPayload
): Record<string, any> => {
  const paramMap: Record<string, string> = {
    fromDate: "from-date",
    toDate: "to-date",
    orderBy: "order-by",
    pageSize: "page-size",
    showFields: "show-fields",
    showTags: "show-tags",
  };

  const mapped: Record<string, any> = {
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
  params: IGetGuardianPayload
): Promise<IGetGuardianResponse> {
  const mappedParams = mapGuardianParams(params);
  return await readData<IGetGuardianResponse>(
    "",
    { params: mappedParams },
    ENewsSource.Guardian
  );
}
