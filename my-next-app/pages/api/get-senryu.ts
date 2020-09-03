import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

type GetResponseData = {
  posts: [
    {
      post_id: string;
      kamigo: string;
      nakashichi: string;
      shimogo: string;
      user_id: string;
      signup_at: string;
    }
  ];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;
  const url = "http://post:8080/get/" + id;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      body: JSON.stringify({}),
    });
    const getResponseData: GetResponseData = await response.json();
    console.log(getResponseData);
    res.status(200).json({ posts: getResponseData.posts });
  } catch (err) {
    console.log(err);
    return err;
  }
};
