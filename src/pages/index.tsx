import Head from "next/head";

import { Home } from "~/features/home/components/Home";
import { requestApi } from "~/lib/requestApi";
import { Prefecture, PrefecturesResponse } from "~/types/api";

type Props = { prefectures: Prefecture[] };

export default function Page({ prefectures }: Props) {
  return (
    <>
      <Head>
        <title>ゆめみフロントエンドコーディング試験</title>
        <meta
          name="description"
          content="ゆめみフロントエンドコーディング試験"
        />
      </Head>
      <Home prefectures={prefectures} />
    </>
  );
}

export async function getStaticProps() {
  const data = await requestApi<PrefecturesResponse>("/v1/prefectures");

  return {
    props: {
      prefectures: data.result,
    },
  };
}
