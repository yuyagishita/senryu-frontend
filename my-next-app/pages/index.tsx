import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA TOP</h1>
      <div>
        <Link href="/login">
          <a>ログイン</a>
        </Link>
      </div>
      <div>
        <Link href="/register">
          <a>登録する</a>
        </Link>
      </div>
    </Layout>
  );
}
