import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import Router from "next/router";
import { emitKeypressEvents } from "readline";
import { useCallback, useEffect, useState, HtmlHTMLAttributes } from "react";
import fetch from "isomorphic-unfetch";
import { userInfo } from "os";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  // useEffect(() => {
  //   // Prefetch the dashboard page as the user will go there after the login
  //   Router.prefetch("/auth");
  // }, []);
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const onSubmit = useCallback(async (data: FormData) => {
    console.log(data);
    const url = "api/login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const postData = await response.json();
    console.log(postData);
  }, []);
  // const onSubmit = (data: FormData): void => {
  //   console.log(data);
  //   console.log(data.username);

  //   const url = "api/login";
  // };

  // console.log(watch("username"));
  // console.log(watch("password"));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
    </Layout>
  );
}
