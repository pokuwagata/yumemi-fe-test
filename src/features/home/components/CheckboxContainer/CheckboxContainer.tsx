import { ChangeEventHandler } from "react";

import { Checkbox } from "~/components/Checkbox";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { Prefecture } from "~/types/api";

type Props = {
  prefecture: Prefecture;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
};

export function CheckboxContainer({ prefecture, handleOnChange }: Props) {
  const { codes } = useSelectedPrefCodesContext();

  return (
    <Checkbox
      onChange={handleOnChange}
      value={prefecture.prefCode}
      checked={codes.includes(prefecture.prefCode)}
    >
      {prefecture.prefName}
    </Checkbox>
  );
}
