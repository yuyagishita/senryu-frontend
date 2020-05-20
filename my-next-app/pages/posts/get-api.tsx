import Layout from "../../components/layout";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import fetch from "isomorphic-unfetch";

export default function Post({ postData }: { postData: any }) {
  console.log(postData);
  {
    return (
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: postData }} />
      </Layout>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const url = "http://localhost:8080/login";
  const url = "http://user:8080/login";
  // const postData = {};
  // await fetch(url, {
  //   method: "POST",
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json charset=utf-8",
  //   },
  //   mode: "no-cors", // no-cors, c
  //   body: JSON.stringify({ username: "yagiyu", password: "miran" }),
  // }).then(function (response) {
  //   console.log(response);
  //   postData = response.json();
  // });
  // .then(function (myJson) {
  //   console.log(JSON.stringify(myJson));
  // });

  // const res = await fetch("https://qiita.com/api/v2/items");
  // const res = await fetch(url);
  // const postData = await res.json();

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
  console.log(response);
  console.log("postData" + postData);

  return {
    props: {
      postData,
    },
  };
};
