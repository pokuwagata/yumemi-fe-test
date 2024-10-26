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

const population: {
  [n: number]: {
    label: string;
    data: { year: number; value: number; rate?: number }[];
  }[];
} = {
  1: [
    {
      label: "総人口",
      data: [
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
    },
    {
      label: "生産年齢人口",
      data: [
        {
          year: 1960,
          value: 3145664,
          rate: 62.42,
        },
        {
          year: 1965,
          value: 3460359,
          rate: 66.91,
        },
        {
          year: 1970,
          value: 3575731,
          rate: 68.97,
        },
      ],
    },
  ],
  2: [
    {
      label: "総人口",
      data: [
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
    },
    {
      label: "生産年齢人口",
      data: [
        {
          year: 1960,
          value: 848838,
          rate: 59.5,
        },
        {
          year: 1965,
          value: 894521,
          rate: 63.15,
        },
        {
          year: 1970,
          value: 940235,
          rate: 65.86,
        },
      ],
    },
  ],
};

const typeToLabel: { [n: number]: string } = {
  1: "総人口",
  2: "生産年齢人口",
};

type DataItem = { name: number; [n: number]: number };

function populationToData(selectedPrefs: number[], type: number) {
  const data: DataItem[] = [];
  selectedPrefs.forEach((prefCode) => {
    const targetPopulation = population[prefCode].find(
      (pop) => pop.label === typeToLabel[type],
    )?.data;

    targetPopulation?.forEach((pop) => {
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
  const data = populationToData(selectedPrefs, 2);

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
