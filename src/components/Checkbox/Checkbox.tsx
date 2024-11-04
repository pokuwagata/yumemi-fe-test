import { ChangeEventHandler, ReactNode } from "react";

import styles from "./Checkbox.module.css";

import { Text } from "~/components/Text";

type Props = {
  value: number;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: ReactNode;
};

export function Checkbox({ value, checked, onChange, children }: Props) {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        onChange={onChange}
        value={value}
        checked={checked}
        className={styles.checkbox}
      />
      <Text fontSize="lg" fontWeight="normal">
        {children}
      </Text>
    </label>
  );
}
