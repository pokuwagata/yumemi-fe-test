import styles from "./Home.module.css";

import { Chart } from "~/features/home/components/Chart";
import { Header } from "~/features/home/components/Header/Header";
import { Prefectures } from "~/features/home/components/Prefectures";

export function Home() {
  const codes = [1, 2];
  const prefectures = [
    {
      prefCode: 1,
      prefName: "北海道",
    },
    {
      prefCode: 2,
      prefName: "青森県",
    },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header>ゆめみフロントエンドコーディング試験</Header>
      </div>
      <main>
        <section>
          <div className={styles.prefectures}>
            <Prefectures />
          </div>
          <Chart codes={codes} prefectures={prefectures} />
        </section>
      </main>
    </div>
  );
}
