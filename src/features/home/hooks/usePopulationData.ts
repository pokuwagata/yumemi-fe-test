import { useEffect, useState } from "react";

import { getPopulationData } from "~/features/home/lib/getPopulationData";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";
import { PopulationType, RawPopulationResponses } from "~/types/api";

export function usePopulationData(codes: number[], type: PopulationType) {
  const [data, setData] = useState<RechartsDataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const rawData: RawPopulationResponses = {};

    async function fetchData() {
      const promises = codes.map((code) => {
        return (async () => {
          rawData[code] = (await requestPopulation(code)).result.data;
        })();
      });

      setIsLoading(true);

      try {
        await Promise.all(promises);
        setData(getPopulationData(rawData, codes, type));
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      }
    }

    fetchData();
  }, [codes, type]);

  return { data, isLoading, error };
}
