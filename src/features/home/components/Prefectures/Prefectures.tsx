import { ChangeEvent } from "react";

import styles from "./Prefectures.module.css";

import { Checkbox } from "~/features/home/components/Checkbox";
import { FieldsTitle } from "~/features/home/components/FieldsTitle/FieldsTitle";
import { usePrefecturesContext } from "~/features/home/contexts/PrefecturesContext";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";

export function Prefectures() {
  const prefectures = usePrefecturesContext();
  const { setCodes } = useSelectedPrefCodesContext();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = e.currentTarget;

    if (checked) {
      setCodes((codes) => [...codes, Number(value)]);
    } else {
      setCodes((codes) => codes.filter((code) => code !== Number(value)));
    }
  }

  return (
    <>
      <h2>
        <FieldsTitle>都道府県</FieldsTitle>
      </h2>
      <fieldset className={styles.list}>
        {prefectures.map((prefecture, i) => {
          return (
            <Checkbox
              prefecture={prefecture}
              handleOnChange={handleOnChange}
              key={i}
            />
          );
        })}
      </fieldset>
    </>
  );
}
