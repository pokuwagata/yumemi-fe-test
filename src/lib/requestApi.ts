import { API_BASE_URL } from "~/lib/const";

export async function requestApi<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    });
    const json = await res.json();

    if (typeof json === "string") {
      if (json === "400") throw new Error("400 Bad Request");
    }

    return json;
  } catch (e) {
    throw e;
  }
}
