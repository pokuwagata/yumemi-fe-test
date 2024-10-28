import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.layout}>
      <header>
        <h1>ゆめみフロントエンドコーディング試験</h1>
      </header>
      <main>
        <section>
          <h2>都道府県</h2>
          <p>チェックボックス</p>
          <figure>
            <p>グラフ</p>
          </figure>
        </section>
      </main>
    </div>
  );
}
