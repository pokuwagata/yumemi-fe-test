import styles from "./Home.module.css";

import { Chart } from "~/features/home/components/Chart";
import { Header } from "~/features/home/components/Header/Header";
import { Prefectures } from "~/features/home/components/Prefectures";
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
          <SelectedPrefCodesContextProvider>
            <div className={styles.prefectures}>
              <Prefectures prefectures={prefectures} />
            </div>
            <Chart prefectures={prefectures} />
          </SelectedPrefCodesContextProvider>
        </section>
      </main>
    </div>
  );
}
