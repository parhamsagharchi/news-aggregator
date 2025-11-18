import type { IGetGuardianPayload } from "./guardian.types";

export const GUARDIAN_QUERY_KEYS = {
  list: (params: IGetGuardianPayload) => ["Guardian", params] as const,
};
