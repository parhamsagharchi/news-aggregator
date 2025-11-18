import { useQuery } from "@tanstack/react-query";
import { getGuardianArticle } from "./guardian.apis";
import type { IGetGuardianPayload } from "./guardian.types";
import { GUARDIAN_QUERY_KEYS } from "./guardian.keys";

export const useGetGuardianArticle = (params: IGetGuardianPayload) => {
  return useQuery({
    queryKey: GUARDIAN_QUERY_KEYS.list(params),
    queryFn: () => getGuardianArticle(params),
  });
};
