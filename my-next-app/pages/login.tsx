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
  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     console.log(e.target);
  //     console.log(e.target);
  //     // const url = "http://user:8080/login";

  //     const url = "api/login";

  //     const response = await fetch(url, {
  //       method: "POST",
  //       cache: "no-cache",
  //       headers: {
  //         "Content-Type": "application/json charset=utf-8",
  //       },
  //       mode: "no-cors", // no-cors, c
  //       body: JSON.stringify({ username: "yagiyu", password: "miran" }),
  //     });
  //     const postData = await response.json();
  //     console.log(postData);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   // Prefetch the dashboard page as the user will go there after the login
  //   Router.prefetch("/auth");
  // }, []);
  const { register, setValue, handleSubmit, watch, errors } = useForm<
    FormData
  >();
  const onSubmit = (data: FormData): void => console.log(data);

  console.log(watch("username"));
  console.log(watch("password"));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">username</label>
          <input name="username" placeholder="username" ref={register} />
        </div>
        <div className="filed">
          <label className="label">password</label>
          <input name="password" placeholder="password" ref={register} />
        </div>
        <div className="filed">
          <button>login</button>
        </div>
      </form>
    </Layout>
  );
}
