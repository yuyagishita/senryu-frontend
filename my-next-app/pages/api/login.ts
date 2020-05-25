import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log("req" + req);
  //   const response = await fetch(url, {
  //     method: "POST",
  //     cache: "no-cache",
  //     headers: {
  //       "Content-Type": "application/json charset=utf-8",
  //     },
  //     mode: "no-cors", // no-cors, c
  //     body: JSON.stringify({ username: "yagiyu", password: "miran" }),
  //   });
  //   const postData = await response.json();
  res.status(200).json({ text: "Hello" });
};
