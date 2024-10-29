import { PopulationResponse } from "~/types/api";

export type RawPopulationResponses = {
  [n: number]: PopulationResponse["result"]["data"];
};

export type PopulationType = 0 | 1 | 2 | 3;
