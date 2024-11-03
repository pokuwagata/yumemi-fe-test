import { useEffect, useState } from "react";

import { getPopulationData } from "~/features/home/lib/getPopulationData";
import {
  PopulationType,
  RawPopulationResponses,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";

export function usePopulationData(codes: number[], type: PopulationType) {
  const [data, setData] = useState<RechartsDataItem[]>([]);
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

  return { data, isLoading };
}
