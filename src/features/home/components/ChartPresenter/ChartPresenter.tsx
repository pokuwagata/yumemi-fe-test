import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { usePrefecturesContext } from "~/features/home/contexts/PrefecturesContext";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { generateUniqueColor } from "~/features/home/lib/generateUniqueColor";
import { RechartsDataItem } from "~/features/home/types/recharts";

type Props = {
  data: RechartsDataItem[];
};

export function ChartPresenter({ data }: Props) {
  const prefectures = usePrefecturesContext();
  const { codes } = useSelectedPrefCodesContext();

  return (
    <figure>
      <ResponsiveContainer aspect={0.5} maxHeight={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 25 }}
        >
          <XAxis dataKey="name">
            <Label value="年度" position="bottom" />
          </XAxis>
          <YAxis tickFormatter={(value) => (value / 10e3).toFixed(1)}>
            <Label
              value={"人口数 (万人)"}
              angle={-90}
              position="left"
              offset={15}
            />
          </YAxis>
          {codes.map((code) => {
            const name = prefectures.find((p) => p.prefCode === code)?.prefName;

            return (
              <Line
                type="monotone"
                name={name}
                dataKey={code}
                stroke={generateUniqueColor(code)}
                key={code}
              />
            );
          })}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend verticalAlign="top" wrapperStyle={{ top: 0 }} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </figure>
  );
}
