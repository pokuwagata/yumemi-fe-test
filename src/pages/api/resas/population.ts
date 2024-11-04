import type { NextApiRequest, NextApiResponse } from "next";

import { API_BASE_URL } from "~/lib/const";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { prefCode } = req.query;

  const path = "/v1/population/composition/perYear";
  const response = await fetch(
    `${API_BASE_URL}${path}?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    },
  );
  const json = await response.json();

  res.status(response.status).json(json);
}
