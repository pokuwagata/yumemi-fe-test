import { ChangeEventHandler } from "react";

type Props = {
  value: number;
  selectedValue: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export function RadioButton({ value, selectedValue, onChange }: Props) {
  return (
    <input type="radio" checked={value === selectedValue} onChange={onChange} />
  );
}
