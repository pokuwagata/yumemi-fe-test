import Head from "next/head";

import { Home } from "~/features/home/components/Home";
import { API_BASE_URL } from "~/lib/const";
import { Prefecture } from "~/types/api";

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
  const res = await fetch(`${API_BASE_URL}/v1/prefectures`, {
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY ?? "",
    },
  });
  const json = await res.json();

  return {
    props: {
      prefectures: json.result,
    },
  };
}
