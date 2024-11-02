export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: null;
  result: Prefecture[];
};

type PopulationData = {
  label: string;
  data: { year: number; value: number; rate?: number }[];
};

export type PopulationResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: PopulationData[];
  };
};
