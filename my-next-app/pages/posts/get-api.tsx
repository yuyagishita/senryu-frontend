import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export default function Post({
  postData,
}: {
  postData: {
    user: {
      firstName: string;
      lastName: string;
      username: string;
    };
  };
}) {
  return (
    <Layout>
      <Head></Head>
      {postData.user.firstName}
      {postData.user.lastName}
      {postData.user.username}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = "http://localhost:8080/login";
  let postData = {};
  await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json charset=utf-8",
    },
    body: JSON.stringify({ username: "yagiyu", password: "miran" }),
  })
    .then(function (response) {
      postData = response.json();
    })
    .then(function (myJson) {
      console.log(JSON.stringify(myJson));
    });

  return {
    props: {
      postData,
    },
  };
};
