import type { NextApiRequest, NextApiResponse } from "next";

import { API_BASE_URL } from "~/lib/const";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const allowedOrigin = "https://yumemi-fe-test.vercel.app";
  const origin = req.headers.origin;

  if (origin) {
    // ブラウザからの CORS リクエストの場合は Origin ヘッダが付与される想定
    if (allowedOrigin !== origin) {
      res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.status(403).json({ message: "Invalid origin" });
    }
  }

  const { prefCode } = req.query;

  const path = "/v1/population/composition/perYear";
  const response = await fetch(
    `${API_BASE_URL}${path}?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY ?? "",
      },
    },
  );
  const json = await response.json();

  res.status(response.status).json(json);
}
