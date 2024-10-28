import { useEffect, useState } from "react";

import { getPopulationData } from "~/features/home/lib/getPopulationData";
import { RawPopulationResponses } from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";

type Props = {
  codes: number[];
};

export function Chart({ codes }: Props) {
  const [data, setData] = useState<RechartsDataItem[]>([]);
  const [type, setType] = useState(1);

  useEffect(() => {
    const rawData: RawPopulationResponses = {};

    async function fetchData() {
      for (const code of codes) {
        rawData[code] = (await requestPopulation(code)).result.data;
      }

      setData(getPopulationData(rawData, codes, type));
    }

    fetchData();
  }, [codes]);

  console.log(data);

  return (
    <figure>
      <p>グラフ</p>
    </figure>
  );
}
