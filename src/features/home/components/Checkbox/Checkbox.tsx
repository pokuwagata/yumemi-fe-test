import styles from "./Checkbox.module.css";

import { Prefecture } from "~/types/api";

type Props = {
  prefecture: Prefecture;
};

export function Checkbox({ prefecture }: Props) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" />
      {prefecture.prefName}
    </label>
  );
}
