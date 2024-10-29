import { API_BASE_URL } from "~/lib/const";

export async function requestApi(path: string) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
  });
  const json = await res.json();

  return json;
}
