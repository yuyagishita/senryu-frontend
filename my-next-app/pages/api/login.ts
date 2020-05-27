import { NextApiRequest, NextApiResponse } from "next";

type Login = {
  username: string;
  password: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const aa: Login = req.body;
  const loginFormData: Login = JSON.parse(req.body);
  console.log(loginFormData);
  const url = "http://user:8080/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      mode: "no-cors", // no-cors, c
      body: JSON.stringify({
        username: loginFormData.username,
        password: loginFormData.password,
      }),
    });
    const postData = await response.json();
    console.log(postData);
    res.status(200).json({ postData });
  } catch (err) {
    console.error("ログイン処理でエラーが発生", err);
    res.status(500).json({ error: "入力された値に誤りがあります。" });
  }
};
