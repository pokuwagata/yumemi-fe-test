import { populationCache } from "~/features/home/lib/populationCache";
import { requestApi } from "~/lib/requestApi";
import { PopulationResponse } from "~/types/api";

export async function requestPopulation(
  code: number,
): Promise<PopulationResponse> {
  if (populationCache.has(code)) {
    return {
      message: null,
      result: populationCache.get(code) as PopulationResponse["result"],
    };
  }

  const data = await requestApi<PopulationResponse>(
    `/v1/population/composition/perYear?cityCode=-&prefCode=${code}`,
  );

  populationCache.set(code, data.result);

  return data;
}
