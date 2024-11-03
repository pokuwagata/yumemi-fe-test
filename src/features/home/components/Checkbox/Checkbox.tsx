import { ChangeEventHandler } from "react";

import styles from "./Checkbox.module.css";

import { Text } from "~/components/Text";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { Prefecture } from "~/types/api";

type Props = {
  prefecture: Prefecture;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
};

export function Checkbox({ prefecture, handleOnChange }: Props) {
  const { codes } = useSelectedPrefCodesContext();

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        onChange={handleOnChange}
        value={prefecture.prefCode}
        checked={codes.includes(prefecture.prefCode)}
        className={styles.checkbox}
      />
      <Text fontSize="lg" fontWeight="normal">
        {prefecture.prefName}
      </Text>
    </label>
  );
}
