import { useEffect, useState } from "react";

import { ChartPresenter } from "~/features/home/components/ChartPresenter/ChartPresenter";
import { PopulationLabels } from "~/features/home/components/PopulationLabels/PopulationLabels";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { getPopulationData } from "~/features/home/lib/getPopulationData";
import {
  PopulationType,
  RawPopulationResponses,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";

export function ChartContainer() {
  const { codes } = useSelectedPrefCodesContext();

  const [data, setData] = useState<RechartsDataItem[]>([]);
  const [type, setType] = useState<PopulationType>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const rawData: RawPopulationResponses = {};

    async function fetchData() {
      const promises = codes.map((code) => {
        return (async () => {
          rawData[code] = (await requestPopulation(code)).result.data;
        })();
      });

      setIsLoading(true);
      await Promise.all(promises);

      setData(getPopulationData(rawData, codes, type));
      setIsLoading(false);
    }

    fetchData();
  }, [codes, type]);

  return (
    <>
      <PopulationLabels type={type} setType={setType} />
      {codes.length === 0 ? (
        <p data-testid="caution-text">都道府県を選択してください</p>
      ) : (
        <>
          <ChartPresenter data={data} />
          {isLoading && <p>Loading</p>}
        </>
      )}
    </>
  );
}
