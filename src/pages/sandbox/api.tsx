import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { API_BASE_URL } from "~/lib/const";
import { PrefecturesResponse } from "~/types/api";

async function fetcher(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
  });
  const json = await res.json();

  return json;
}

async function populationFetcher(path: string, { arg }: { arg: string }) {
  return await fetcher(`${path}?cityCode=-&prefCode=${arg}`);
}

export default function Api() {
  const { data, isLoading, error } = useSWR<PrefecturesResponse>(
    "/v1/prefectures",
    fetcher,
  );
  const { data: population, trigger } = useSWRMutation(
    "/v1/population/composition/perYear",
    populationFetcher,
  );

  if (error) return <p>error: {JSON.stringify(error)}</p>;
  if (isLoading) return <p>isLoading</p>;

  return (
    <>
      <button
        onClick={async () => {
          await trigger("1");
        }}
      >
        人口構成取得
      </button>
      <p>population:</p>
      <p>{population ? JSON.stringify(population) : null}</p>
      <p>data:</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
