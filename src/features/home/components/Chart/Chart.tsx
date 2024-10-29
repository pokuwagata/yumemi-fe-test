import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RadioButton } from "~/features/home/components/RadioButton/RadioButton";
import { getPopulationData } from "~/features/home/lib/getPopulationData";
import {
  populationLabels,
  populationLabelValues,
} from "~/features/home/lib/const";
import {
  PopulationType,
  RawPopulationResponses,
} from "~/features/home/types/api";
import { RechartsDataItem } from "~/features/home/types/recharts";
import { requestPopulation } from "~/lib/requestPopulation";
import { PrefecturesResponse } from "~/types/api";

type Props = {
  codes: number[];
  prefectures: PrefecturesResponse["result"];
};

export function Chart({ codes, prefectures }: Props) {
  const [data, setData] = useState<RechartsDataItem[]>([]);
  const [type, setType] = useState<PopulationType>(0);

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
              {populationLabels[value]}
            </label>
          );
        })}
      </fieldset>
      <figure>
        <LineChart
          width={800}
          height={800}
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
            const name = prefectures.find((p) => p.prefCode === code)?.prefName;

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
      </figure>
    </>
  );
}
