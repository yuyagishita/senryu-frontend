import { NextApiRequest, NextApiResponse } from "next";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const registerFormData: RegisterFormData = JSON.parse(req.body);
  console.log(registerFormData);
  const url = "http://user:8080/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      mode: "no-cors", // no-cors, c
      body: JSON.stringify({
        username: registerFormData.username,
        email: registerFormData.email,
        password: registerFormData.password,
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
