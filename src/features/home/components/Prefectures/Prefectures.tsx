import { ChangeEvent } from "react";

import { Text } from "~/components/Text";
import { Checkbox } from "~/features/home/components/Checkbox";
import { usePrefecturesContext } from "~/features/home/contexts/PrefecturesContext";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import styles from "./Prefectures.module.css";

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
      <h2 className={styles.title}>
        <Text fontSize="lg" fontWeight="medium">
          都道府県
        </Text>
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
