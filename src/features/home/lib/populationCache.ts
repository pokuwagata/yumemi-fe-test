import { PopulationResponse } from "~/types/api";

export const populationCache = new Map<number, PopulationResponse["result"]>();
