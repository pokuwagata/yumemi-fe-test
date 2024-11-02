import { createContext, ReactNode, useContext, useMemo } from "react";

import { Prefecture } from "~/types/api";

const PrefecturesContext = createContext<Prefecture[] | undefined>(undefined);

export function usePrefecturesContext() {
  const context = useContext(PrefecturesContext);

  if (!context) {
    throw new Error("PrefecturesContext is undefined");
  }

  return context;
}

export function PrefecturesContextProvider({
  children,
  prefectures,
}: {
  children: ReactNode;
  prefectures: Prefecture[];
}) {
  const contextValue = useMemo(() => prefectures, [prefectures]);

  return (
    <PrefecturesContext.Provider value={contextValue}>
      {children}
    </PrefecturesContext.Provider>
  );
}
