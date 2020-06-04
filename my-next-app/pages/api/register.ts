import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

type RegisterResponseData = {
  id: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const registerFormData: RegisterFormData = JSON.parse(req.body);
  console.log(registerFormData);
  const url = "http://user:8080/register";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json charset=utf-8",
      },
      body: JSON.stringify({
        username: registerFormData.username,
        email: registerFormData.email,
        password: registerFormData.password,
      }),
    });
    const responseData: RegisterResponseData = await response.json();
    console.log(responseData);
    console.log(responseData.id);
    res.status(200).json({ id: responseData.id });
  } catch (err) {
    console.error("ログイン処理でエラーが発生", err);
    res.status(500).json({ error: "入力された値に誤りがあります。" });
  }
};
