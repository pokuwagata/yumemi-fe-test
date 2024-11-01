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

import { RadioButton } from "~/features/home/components/RadioButton/RadioButton";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import {
  populationLabelValues,
  populationValueToLabel,
} from "~/features/home/lib/const";
import { getPopulationData } from "~/features/home/lib/getPopulationData";
import {
  PopulationType,
  RawPopulationResponses,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Chart({ prefectures }: Props) {
  const [data, setData] = useState<RechartsDataItem[]>([]);
  const [type, setType] = useState<PopulationType>(0);
  const { codes } = useSelectedPrefCodesContext();

  useEffect(() => {
    const rawData: RawPopulationResponses = {};

    async function fetchData() {
      for (const code of codes) {
        rawData[code] = (await requestPopulation(code)).result.data;
      }

      setData(getPopulationData(rawData, codes, type));
    }

    fetchData();
  }, [codes, type]);

  return (
    <>
      <fieldset>
        {populationLabelValues.map((value, i) => {
          return (
            <label key={i}>
              <RadioButton
                value={value}
                selectedValue={type}
                onChange={(e) => {
                  if (e.currentTarget.value) {
                    setType(value);
                  }
                }}
              />
              {populationValueToLabel[value]}
            </label>
          );
        })}
      </fieldset>
      <figure>
        <ResponsiveContainer aspect={0.8}>
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
    </>
  );
}
