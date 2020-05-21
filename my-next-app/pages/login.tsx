import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Login() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA Login</h1>
      <form>
        <div className="filed">
          <label className="label">username</label>
          <input className="input" type="username" placeholder="username" />
        </div>
        <div className="filed">
          <label className="label">password</label>
          <input className="input" type="password" placeholder="password" />
        </div>
      </form>
    </Layout>
  );
}
