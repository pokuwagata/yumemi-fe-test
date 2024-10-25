import { http, HttpResponse } from "msw";

import population1 from "./population-1.json";
import population2 from "./population-2.json";
import prefectures from "./prefectures.json";

import { API_BASE_URL } from "~/lib/const";

export const handlers = [
  http.get(`${API_BASE_URL}/v1/prefectures`, () => {
    return HttpResponse.json(prefectures);
  }),
  http.get(
    `${API_BASE_URL}/v1/population/composition/perYear`,
    ({ request }) => {
      const url = new URL(request.url);

      const prefCode = url.searchParams.get("prefCode");

      let population;
      switch (prefCode) {
        case "1":
          population = population1;
        case "2":
          population = population2;
      }
      return HttpResponse.json(population);
    },
  ),
];
