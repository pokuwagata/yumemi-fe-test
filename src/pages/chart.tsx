import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const prefs = [
  {
    prefCode: 1,
    prefName: "北海道",
  },
  {
    prefCode: 2,
    prefName: "青森県",
  },
];

const population: { [n: number]: { year: number; value: number }[] } = {
  1: [
    {
      year: 1960,
      value: 5039206,
    },
    {
      year: 1965,
      value: 5171800,
    },
    {
      year: 1970,
      value: 5184287,
    },
  ],
  2: [
    {
      year: 1960,
      value: 1426606,
    },
    {
      year: 1965,
      value: 1416591,
    },
    {
      year: 1970,
      value: 1427520,
    },
  ],
};

type DataItem = { name: number; [n: number]: number };

function populationToData(selectedPrefs: number[]) {
  const data: DataItem[] = [];
  selectedPrefs.forEach((prefCode) => {
    population[prefCode].forEach((pop) => {
      const target = data.find((d) => d.name === pop.year);
      if (!target) {
        const item: DataItem = { name: pop.year };
        item[prefCode] = pop.value;
        data.push(item);
      } else {
        target[prefCode] = pop.value;
      }
    });
  });
  return data;
}

export default function chart() {
  const selectedPrefs = [1, 2];
  const data = populationToData(selectedPrefs);

  return (
    <LineChart width={400} height={400} data={data}>
      <XAxis dataKey="name">
        <Label value="年度" offset={0} position="insideBottom" />
      </XAxis>
      <YAxis
        label={{
          value: "人口数",
          angle: -90,
          position: "insideLeft",
          textAnchor: "middle",
        }}
      />
      {selectedPrefs.map((code) => {
        const name = prefs.find((p) => p.prefCode === code)?.prefName;

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
  );
}
