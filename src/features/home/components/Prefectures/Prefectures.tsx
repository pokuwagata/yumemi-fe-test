import { MouseEvent } from "react";

import { Checkbox } from "~/features/home/components/Checkbox";
import { usePrefCodesContext } from "~/features/home/contexts/PrefCodesContext";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Prefectures({ prefectures }: Props) {
  const { codes, setCodes } = usePrefCodesContext();

  function handleOnClick(e: MouseEvent<HTMLInputElement>) {
    const { checked, value } = e.currentTarget;

    if (checked) {
      setCodes([...codes, Number(value)]);
    } else {
      setCodes(codes.filter((code) => code !== Number(value)));
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
              handleOnClick={handleOnClick}
              key={i}
            />
          );
        })}
      </fieldset>
    </>
  );
}
