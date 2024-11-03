import { useState } from "react";

import { ChartPresenter } from "~/features/home/components/ChartPresenter/ChartPresenter";
import { PopulationLabels } from "~/features/home/components/PopulationLabels/PopulationLabels";
import { useSelectedPrefCodesContext } from "~/features/home/contexts/SelectedPrefCodesContext";
import { usePopulationData } from "~/features/home/hooks/usePopulationData";
import { PopulationType } from "~/features/home/types/api";

export function ChartContainer() {
  const { codes } = useSelectedPrefCodesContext();
  const [type, setType] = useState<PopulationType>(0);
  const { data, isLoading, error } = usePopulationData(codes, type);

  if (error) throw error;

  return (
    <>
      <PopulationLabels type={type} setType={setType} />
      {codes.length === 0 ? (
        <p data-testid="caution-text">都道府県を選択してください</p>
      ) : (
        <>
          <ChartPresenter data={data} />
          {isLoading && <p>Loading</p>}
        </>
      )}
    </>
  );
}
