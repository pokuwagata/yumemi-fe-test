import styles from "./Home.module.css";

import { Chart } from "~/features/home/components/Chart";
import { Header } from "~/features/home/components/Header/Header";
import { Prefectures } from "~/features/home/components/Prefectures";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Home({ prefectures }: Props) {
  const codes = [1, 2];

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header>ゆめみフロントエンドコーディング試験</Header>
      </div>
      <main>
        <section>
          <div className={styles.prefectures}>
            <Prefectures prefectures={prefectures} />
          </div>
          <Chart codes={codes} prefectures={prefectures} />
        </section>
      </main>
    </div>
  );
}
