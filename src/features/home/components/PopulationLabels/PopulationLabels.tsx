import { Dispatch, SetStateAction } from "react";

import { RadioButton } from "~/features/home/components/RadioButton/RadioButton";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import {
  populationLabelValues,
  populationValueToLabel,
} from "~/features/home/lib/const";
import { PopulationType } from "~/features/home/types/api";

type Props = {
  type: PopulationType;
  setType: Dispatch<SetStateAction<PopulationType>>;
};

export function PopulationLabels({ type, setType }: Props) {
  const { codes } = useSelectedPrefCodesContext();

  return (
    <fieldset data-testid="population-types" disabled={codes.length === 0}>
      {populationLabelValues.map((value, i) => {
        return (
          <label key={i}>
            <RadioButton
              value={value}
              selectedValue={type}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  setType(value);
                }
              }}
            />
            {populationValueToLabel[value]}
          </label>
        );
      })}
    </fieldset>
  );
}
