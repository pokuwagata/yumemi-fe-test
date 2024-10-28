import styles from "./Home.module.css";

import { Chart } from "~/features/home/components/Chart";
import { Header } from "~/features/home/components/Header/Header";
import { Prefectures } from "~/features/home/components/Prefectures";

export function Home() {
  return (
    <div className={styles.layout}>
      <Header>ゆめみフロントエンドコーディング試験</Header>
      <main>
        <section>
          <Prefectures />
          <Chart />
        </section>
      </main>
    </div>
  );
}
