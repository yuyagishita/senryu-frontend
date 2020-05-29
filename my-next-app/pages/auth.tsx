import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  console.log(router.query);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>NANPA Auth</h1>
    </Layout>
  );
}
