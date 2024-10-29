import { PopulationType } from "~/features/home/types/api";

const populationValueToLabel: { [key: number]: string } = {
  0: "総人口",
  1: "年少人口",
  2: "生産年齢人口",
  3: "老年人口",
};

export const populationLabels = Object.values(populationValueToLabel);

export const populationLabelValues = Object.keys(populationValueToLabel).map(
  (v) => Number(v),
) as PopulationType[];
