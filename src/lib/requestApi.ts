import { PROXY_API_PATH } from "~/lib/const";

const errorCodeToMessage: { [key in string]: string } = {
  "400": "Bad Request",
  "403": "Forbidden",
  "404": "NotFound",
  "429": "Too Many Requests",
  "500": "Server Error",
};

export async function requestApi<T>(path: string): Promise<T> {
  try {
    const res = await fetch(`${PROXY_API_PATH}${path}`);
    const json = await res.json();

    switch (res.status) {
      case 500:
        throw new Error(`500 ${errorCodeToMessage["500"]}`);
      case 429:
        throw new Error(`429 ${errorCodeToMessage["429"]}`);

      case 200:
        if (
          typeof json === "string" &&
          errorCodeToMessage.hasOwnProperty(json)
        ) {
          // エラーコード 400, 404 (body が string の場合)
          throw new Error(`${json} ${errorCodeToMessage[json]}`);
        } else if (
          typeof json === "object" &&
          json.hasOwnProperty("statusCode") &&
          errorCodeToMessage.hasOwnProperty(json.statusCode)
        ) {
          // エラーコード 403, 404
          throw new Error(
            `${json.statusCode} ${errorCodeToMessage[json.statusCode]}`,
          );
        }
    }

    return json;
  } catch (e) {
    throw e;
  }
}
