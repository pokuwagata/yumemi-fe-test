export function generateUniqueColor(value: number): string {
  const r = (value * 231) % 256;
  const g = (value * 321) % 256;
  const b = (value * 123) % 256;

  const color = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return color;
}
