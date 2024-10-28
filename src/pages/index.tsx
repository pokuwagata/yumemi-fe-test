import Head from "next/head";

import { Home } from "~/features/home/components/Home";

export default function Page() {
  return (
    <>
      <Head>
        <title>ゆめみフロントエンドコーディング試験</title>
        <meta
          name="description"
          content="ゆめみフロントエンドコーディング試験"
        />
      </Head>
      <Home />
    </>
  );
}
