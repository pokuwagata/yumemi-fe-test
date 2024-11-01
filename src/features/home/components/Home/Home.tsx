import styles from "./Home.module.css";

import { Chart } from "~/features/home/components/Chart";
import { Header } from "~/features/home/components/Header/Header";
import { Prefectures } from "~/features/home/components/Prefectures";
import { PrefCodesContextProvider } from "~/features/home/contexts/PrefCodesContext";
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
          <PrefCodesContextProvider>
            <div className={styles.prefectures}>
              <Prefectures prefectures={prefectures} />
            </div>
            <Chart prefectures={prefectures} />
          </PrefCodesContextProvider>
        </section>
      </main>
    </div>
  );
}
