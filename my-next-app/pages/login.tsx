import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import Router from "next/router";
import { emitKeypressEvents } from "readline";
import { useCallback, useEffect } from "react";

export default function Login() {
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    Router.push("/auth");
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
          <input className="input" type="username" placeholder="username" />
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
