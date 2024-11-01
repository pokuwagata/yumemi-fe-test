import { Dispatch, SetStateAction, MouseEvent } from "react";

import { Checkbox } from "~/features/home/components/Checkbox";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
  codes: number[];
  setCodes: Dispatch<SetStateAction<number[]>>;
};

export function Prefectures({ prefectures, codes, setCodes }: Props) {
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
