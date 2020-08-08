import { NextApiRequest, NextApiResponse } from "next";

type LoginFormData = {
  username: string;
  password: string;
};

type LoginResponseData = {
  user: {
    user_id: string;
    username: string;
  };
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const loginFormData: LoginFormData = JSON.parse(req.body);
  console.log(loginFormData);
  const url = "http://user:8080/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      body: JSON.stringify({
        username: loginFormData.username,
        password: loginFormData.password,
      }),
    });
    const loginResponseData: LoginResponseData = await response.json();
    console.log(loginResponseData.user);
    res.status(200).json({ user: loginResponseData.user });
  } catch (err) {
    console.error("ログイン処理でエラーが発生", err);
    res.status(500).json({ error: "入力された値に誤りがあります。" });
  }
};
