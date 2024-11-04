import { ErrorBoundary } from "react-error-boundary";

import styles from "./Home.module.css";

import { Header } from "~/components/Header";
import { ChartContainer } from "~/features/home/components/ChartContainer";
import { Fallback } from "~/features/home/components/Fallback";
import { Prefectures } from "~/features/home/components/Prefectures";
import { PrefecturesContextProvider } from "~/features/home/contexts/PrefecturesContext";
import { SelectedPrefCodesContextProvider } from "~/features/home/contexts/SelectedPrefCodesContext";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Home({ prefectures }: Props) {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header>ゆめみフロントエンドコーディング試験</Header>
      </div>
      <main>
        <section>
          <ErrorBoundary FallbackComponent={Fallback}>
            <PrefecturesContextProvider prefectures={prefectures}>
              <SelectedPrefCodesContextProvider>
                <div className={styles.prefectures}>
                  <Prefectures />
                </div>
                <ChartContainer />
              </SelectedPrefCodesContextProvider>
            </PrefecturesContextProvider>
          </ErrorBoundary>
        </section>
      </main>
    </div>
  );
}
