import { ChangeEventHandler, ReactNode } from "react";

import { Text } from "~/components/Text";

type Props = {
  value: number;
  selectedValue: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: ReactNode;
};

export function RadioButton({
  value,
  selectedValue,
  onChange,
  children,
}: Props) {
  return (
    <label>
      <input
        type="radio"
        checked={value === selectedValue}
        onChange={onChange}
      />
      <Text fontSize="lg" fontWeight="normal">
        {children}
      </Text>
    </label>
  );
}
