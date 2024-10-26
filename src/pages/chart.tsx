import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function chart() {
  const data = [
    { name: "1960", 1: 100, 2: 50 },
    { name: "1965", 1: 200, 2: 60 },
  ];

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
      <Line type="monotone" name="北海道" dataKey="1" stroke="#8884d8" />
      <Line type="monotone" name="青森県" dataKey="2" stroke="#888000" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Tooltip />
    </LineChart>
  );
}
