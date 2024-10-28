import { requestApi } from "~/lib/requestApi";
import { PopulationResponse } from "~/types/api";

export async function requestPopulation(
  code: number,
): Promise<PopulationResponse> {
  return await requestApi(
    `/v1/population/composition/perYear?cityCode=-&prefCode=${code}`,
  );
}
