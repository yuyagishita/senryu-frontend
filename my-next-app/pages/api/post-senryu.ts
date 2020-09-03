import { NextApiRequest, NextApiResponse } from "next";
import fetch from "isomorphic-unfetch";

type PostFormData = {
  userId: string;
  kamigo: string;
  nakashichi: string;
  shimogo: string;
};

type PostResponseData = {
  postId: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const postFormData: PostFormData = JSON.parse(req.body);
  console.log(postFormData);
  const url = "http://post:8080/post";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      body: JSON.stringify({
        kamigo: postFormData.kamigo,
        nakashichi: postFormData.nakashichi,
        shimogo: postFormData.shimogo,
        userId: postFormData.userId,
      }),
    });
    const postResponseData: PostResponseData = await response.json();
    console.log(postResponseData);
    res.status(200).json({ postId: postResponseData.postId });
  } catch (err) {
    console.log(err);
    return err;
  }
};
