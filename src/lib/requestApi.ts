import { API_BASE_URL } from "~/lib/const";

const errorCodeToMessage: { [key in string]: string } = {
  "400": "Bad Request",
  "403": "Forbidden",
  "404": "NotFound",
  "429": "Too Many Requests",
};

export async function requestApi<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    });
    const json = await res.json();

    if (typeof json === "string" && errorCodeToMessage.hasOwnProperty(json)) {
      // エラーコード 400, 404 で body が string の場合
      throw new Error(`${json} ${errorCodeToMessage[json]}`);
    } else if (typeof json === "object") {
      if (json.hasOwnProperty("statusCode")) {
        // エラーコード 403, 404
        throw new Error(
          `${json.statusCode} ${errorCodeToMessage[json.statusCode]}`,
        );
      }

      if (res.status === 429) {
        throw new Error(`429 ${errorCodeToMessage["429"]}`);
      }
    }

    return json;
  } catch (e) {
    throw e;
  }
}
