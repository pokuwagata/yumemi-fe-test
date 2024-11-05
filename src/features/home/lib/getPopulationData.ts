import { populationValueToLabel } from "~/features/home/lib/const";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { RawPopulationResponses, PopulationType } from "~/types/api";

export function getPopulationData(
  rawData: RawPopulationResponses,
  selectedPrefs: number[],
  type: PopulationType,
) {
  const data: RechartsDataItem[] = [];

  selectedPrefs.forEach(async (prefCode) => {
    const targetPopulation = rawData[prefCode].find(
      (pop) => pop.label === populationValueToLabel[type],
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
