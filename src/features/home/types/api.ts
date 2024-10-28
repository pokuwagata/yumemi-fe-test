import { PopulationResponse } from "~/types/api";

export type RawPopulationResponses = {
  [n: number]: PopulationResponse["result"]["data"];
};
