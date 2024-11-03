import { http, HttpResponse } from "msw";

import population1 from "./population-1.json";
import population2 from "./population-2.json";
import prefectures from "./prefectures.json";

import { API_BASE_URL } from "~/lib/const";

export function mockError(code: string) {
  let statusCode;
  let body;

  switch (code) {
    case "400":
      statusCode = 200;
      body = "400";

      break;
    case "403":
      statusCode = 200;

      body = {
        statusCode: "403",
        message: "Forbidden.",
        description: "",
      };

      break;
    case "404-1":
      statusCode = 200;

      body = {
        statusCode: "404",
        message: "404. That's an error.",
        description: "The requested URL /404 was not found on this server.",
      };

      break;
    case "404-2":
      statusCode = 200;
      body = "404";
      break;
    case "429":
      statusCode = 429;

      body = {
        message: null,
      };

      break;
    case "500":
      statusCode = 500;

      body = "Server Error";
      break;
  }

  return { statusCode, body };
}

export const handlers = [
  http.get(`${API_BASE_URL}/v1/prefectures`, () => {
    return HttpResponse.json(prefectures);
  }),
  http.get(
    `${API_BASE_URL}/v1/population/composition/perYear`,
    ({ request }) => {
      // エラーレスポンスをモックする場合は以下の実装を利用する

      // const errorCode = "500";

      // if (errorCode) {
      //   const { statusCode, body } = mockError(errorCode);

      //   return HttpResponse.json(body, {
      //     status: statusCode,
      //   });
      // }

      const url = new URL(request.url);

      const prefCode = url.searchParams.get("prefCode");

      let population;

      switch (prefCode) {
        case "1":
          population = population1;
          break;
        case "2":
          population = population2;
          break;
        default:
          population = population1;
      }

      return HttpResponse.json(population);
    },
  ),
];
