import { MouseEventHandler } from "react";

import styles from "./Checkbox.module.css";

import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { Prefecture } from "~/types/api";

type Props = {
  prefecture: Prefecture;
  handleOnClick: MouseEventHandler<HTMLInputElement>;
};

export function Checkbox({ prefecture, handleOnClick }: Props) {
  const { codes } = useSelectedPrefCodesContext();

  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        onClick={handleOnClick}
        value={prefecture.prefCode}
        checked={codes.includes(prefecture.prefCode)}
      />
      {prefecture.prefName}
    </label>
  );
}
