import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

type GetAllResponseData = {
  post: {
    id: string;
    kamigo: string;
    nakashichi: string;
    shimogo: string;
    user_id: string;
    // signup_at: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = "http://post:8080/getAll";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      body: JSON.stringify({}),
    });
    const getAllResponseData: GetAllResponseData = await response.json();
    console.log(getAllResponseData);
    res.status(200).json({ post: getAllResponseData.post });
  } catch (err) {
    console.error("全川柳データ取得処理でエラーが発生", err);
    res.status(500).json({ error: "API側でエラー発生" });
  }
};
