import { populationLabels } from "~/features/home/lib/populationLabels";
import {
  RawPopulationResponses,
  PopulationType,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";

export function getPopulationData(
  rawData: RawPopulationResponses,
  selectedPrefs: number[],
  type: PopulationType,
) {
  const data: RechartsDataItem[] = [];

  selectedPrefs.forEach(async (prefCode) => {
    const targetPopulation = rawData[prefCode].find(
      (pop) => pop.label === populationLabels[type],
    )?.data;

    targetPopulation?.forEach((pop) => {
      const target = data.find((d) => d.name === pop.year);

      if (!target) {
        const item: RechartsDataItem = { name: pop.year };

        item[prefCode] = pop.value;
        data.push(item);
      } else {
        target[prefCode] = pop.value;
      }
    });
  });

  return data;
}
