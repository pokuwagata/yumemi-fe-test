import { RawPopulationResponses } from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";

const typeToLabel: { [n: number]: string } = {
  1: "総人口",
  2: "生産年齢人口",
};

export function getPopulationData(
  rawData: RawPopulationResponses,
  selectedPrefs: number[],
  type: number,
) {
  const data: RechartsDataItem[] = [];

  selectedPrefs.forEach(async (prefCode) => {
    const targetPopulation = rawData[prefCode].find(
      (pop) => pop.label === typeToLabel[type],
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
