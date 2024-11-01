import { MouseEventHandler } from "react";

import styles from "./Checkbox.module.css";

import { Prefecture } from "~/types/api";

type Props = {
  prefecture: Prefecture;
  handleOnClick: MouseEventHandler<HTMLInputElement>;
};

export function Checkbox({ prefecture, handleOnClick }: Props) {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        onClick={handleOnClick}
        value={prefecture.prefCode}
      />
      {prefecture.prefName}
    </label>
  );
}
