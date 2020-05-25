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

export default function Login() {
  const useInput = (initailValue: string) => {
    const [value, set] = useState(initailValue);
    return {
      value,
      onChange: (e: React.ChangeEvent<HTMLFormElement>) => set(e.target.value),
    };
  };
  const username = useInput("");
  const password = useInput("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(e.target);
      console.log(e.target);
      // const url = "http://user:8080/login";

      const url = "api/login";

      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json charset=utf-8",
        },
        mode: "no-cors", // no-cors, c
        body: JSON.stringify({ username: "yagiyu", password: "miran" }),
      });
      const postData = await response.json();
      console.log(postData);
      // Router.push("/auth");

      // fetch(url, {
      //   method: "POST",
      //   cache: "no-cache",
      //   headers: {
      //     "Content-Type": "application/json charset=utf-8",
      //   },
      //   body: JSON.stringify({ username: "yagiyu", password: "miran" }),
      // }).then((res) => {
      //   console.log(res);
      //   Router.push("/auth");
      // });
    },
    []
  );

  useEffect(() => {
    // Prefetch the dashboard page as the user will go there after the login
    Router.prefetch("/auth");
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="filed">
          <label className="label">username</label>
          <input
            className="input"
            type="username"
            placeholder="username"
            {...username}
          />
        </div>
        <div className="filed">
          <label className="label">password</label>
          <input className="input" type="password" placeholder="password" />
        </div>
        <div className="filed">
          <button className="button">login</button>
        </div>
      </form>
    </Layout>
  );
}
