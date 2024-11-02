import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PopulationLabels } from "~/features/home/components/PopulationLabels/PopulationLabels";
import { usePrefecturesContext } from "~/features/home/contexts/PrefecturesContext";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { getPopulationData } from "~/features/home/lib/getPopulationData";
import {
  PopulationType,
  RawPopulationResponses,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";

export function Chart() {
  const prefectures = usePrefecturesContext();
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
          <figure>
            <ResponsiveContainer aspect={0.5} maxHeight={500}>
              <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <XAxis dataKey="name">
                  <Label value="年度" position="bottom" />
                </XAxis>
                <YAxis tickFormatter={(value) => (value / 10e4).toFixed(1)}>
                  <Label value={"人口数 (万人)"} angle={-90} position="left" />
                </YAxis>
                {codes.map((code) => {
                  const name = prefectures.find(
                    (p) => p.prefCode === code,
                  )?.prefName;

                  return (
                    <Line
                      type="monotone"
                      name={name}
                      dataKey={code}
                      stroke="#8884d8"
                      key={code}
                    />
                  );
                })}
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </figure>
          {isLoading && <p>Loading</p>}
        </>
      )}
    </>
  );
}
