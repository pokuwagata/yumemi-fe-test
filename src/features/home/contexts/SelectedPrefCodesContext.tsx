import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
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
  const [codes, setCodes] = useState<number[]>([1]);

  const contextValue = useMemo(() => {
    return {
      codes,
      setCodes,
    };
  }, [codes, setCodes]);

  return (
    <SelectedPrefCodesContext.Provider value={contextValue}>
      {children}
    </SelectedPrefCodesContext.Provider>
  );
}
