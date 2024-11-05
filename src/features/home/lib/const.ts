import { PopulationType } from "~/types/api";

export const populationValueToLabel: { [key: number]: string } = {
  0: "総人口",
  1: "年少人口",
  2: "生産年齢人口",
  3: "老年人口",
};

export const populationLabelValues = Object.keys(populationValueToLabel).map(
  (v) => Number(v),
) as PopulationType[];
