import Router from "next/router";
import { useCallback } from "react";
import fetch from "isomorphic-unfetch";
import { useForm } from "react-hook-form";

type LoginFormData = {
  username: string;
  password: string;
};

type LoginSuccessData = {
  user: {
    firstName: string;
    lastName: string;
    username: string;
  };
};

type LoginFailureData = {
  error: string;
};

export default function Login() {
  const { register, handleSubmit, watch, errors } = useForm<LoginFormData>();
  const onSubmit = useCallback(async (data: LoginFormData) => {
    console.log(data);
    const url = "api/login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    if (response.status == 200) {
      const loginSuccessData: LoginSuccessData = await response.json();
      console.log(loginSuccessData);
      Router.push({
        pathname: "/auth",
        query: {
          firstName: loginSuccessData.user.firstName,
          lastName: loginSuccessData.user.lastName,
          username: loginSuccessData.user.username,
        },
      });
    } else {
      const loginFailureData: LoginFailureData = await response.json();
      console.log(loginFailureData);
      alert(loginFailureData.error);
    }
  }, []);

  console.log(watch("username"));
  console.log(watch("password"));

  return (
    <>
      <h1>NANPA Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">username</label>
          <input
            name="username"
            placeholder="username"
            ref={register({ required: true })}
          />
          {errors.username && "usernameを入力してください。"}
        </div>
        <div className="filed">
          <label className="label">password</label>
          <input
            name="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && "passwordを入力してください。"}
        </div>
        <div className="filed">
          <button>login</button>
        </div>
      </form>
    </>
  );
}
