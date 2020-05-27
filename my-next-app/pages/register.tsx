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
import { userInfo, type } from "os";
import { useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type PostData = {
  error: string;
};

export default function Register() {
  const { register, handleSubmit, watch, errors } = useForm<FormData>();
  const onSubmit = useCallback(async (data: FormData) => {
    console.log(data);
    // const url = "api/login";
    // const response = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: data.username,
    //     password: data.password,
    //   }),
    // });
    // const postData: PostData = await response.json();
    // console.log(postData);
    // if (response.status == 200) {
    //   Router.push("/auth");
    // } else {
    //   alert(postData.error);
    // }
  }, []);

  console.log(watch("firstName"));
  console.log(watch("lastName"));
  console.log(watch("username"));
  console.log(watch("email"));
  console.log(watch("password"));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">firstName</label>
          <input
            name="firstName"
            placeholder="firstName"
            ref={register({ required: true })}
          />
          {errors.firstName && "firstNameを入力してください。"}
        </div>
        <div className="filed">
          <label className="label">lastName</label>
          <input
            name="lastName"
            placeholder="lastName"
            ref={register({ required: true })}
          />
          {errors.lastName && "lastNameを入力してください。"}
        </div>
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
          <label className="label">email</label>
          <input
            name="email"
            placeholder="email"
            ref={register({ required: true })}
          />
          {errors.email && "emailを入力してください。"}
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
          <button>登録する</button>
        </div>
      </form>
    </Layout>
  );
}
