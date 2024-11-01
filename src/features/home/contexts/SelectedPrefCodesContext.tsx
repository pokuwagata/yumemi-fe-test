import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type SelectedPrefCodes = {
  codes: number[];
  setCodes: Dispatch<SetStateAction<number[]>>;
};

const SelectedPrefCodesContext = createContext<SelectedPrefCodes | undefined>(
  undefined,
);

export function useSelectedPrefCodesContext() {
  const context = useContext(SelectedPrefCodesContext);

  if (!context) {
    throw new Error("SelectedPrefCodesContext is undefined");
  }

  return context;
}

export function SelectedPrefCodesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [codes, setCodes] = useState<number[]>([]);

  return (
    <SelectedPrefCodesContext.Provider value={{ codes, setCodes }}>
      {children}
    </SelectedPrefCodesContext.Provider>
  );
}
