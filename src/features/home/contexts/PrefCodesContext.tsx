import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PrefCodes = {
  codes: number[];
  setCodes: Dispatch<SetStateAction<number[]>>;
};

const PrefCodesContext = createContext<PrefCodes | undefined>(undefined);

export function usePrefCodesContext() {
  const context = useContext(PrefCodesContext);

  if (!context) {
    throw new Error("PrefCodesContext is undefined");
  }

  return context;
}

export function PrefCodesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [codes, setCodes] = useState<number[]>([]);

  return (
    <PrefCodesContext.Provider value={{ codes, setCodes }}>
      {children}
    </PrefCodesContext.Provider>
  );
}
