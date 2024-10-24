import useSWR from "swr";

async function fetcher(path: string) {
  const res = await fetch("https://opendata.resas-portal.go.jp/api" + path, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
  });
  const json = await res.json();

  return json;
}

export default function Home() {
  const { data, isLoading, error } = useSWR("/v1/prefectures", fetcher);

  if (error) return <p>error: {JSON.stringify(error)}</p>;
  if (isLoading) return <p>isLoading</p>;

  return (
    <>
      <p>data:</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
