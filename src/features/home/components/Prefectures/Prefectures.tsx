import { ChangeEvent } from "react";

import { Checkbox } from "~/features/home/components/Checkbox";
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
      <h2>都道府県</h2>
      <fieldset>
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
