import { Dispatch, SetStateAction } from "react";

import styles from "./PopulationLabels.module.css";

import { FieldsTitle } from "~/features/home/components/FieldsTitle/FieldsTitle";
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
    <>
      <h2>
        <FieldsTitle>種別</FieldsTitle>
      </h2>
      <fieldset
        data-testid="population-types"
        disabled={codes.length === 0}
        className={styles.list}
      >
        {populationLabelValues.map((value, i) => {
          return (
            <RadioButton
              key={i}
              value={value}
              selectedValue={type}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  setType(value);
                }
              }}
            >
              {populationValueToLabel[value]}
            </RadioButton>
          );
        })}
      </fieldset>
    </>
  );
}
