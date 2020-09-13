import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

type GetAllResponseData = {
  posts: [
    {
      postId: string;
      kamigo: string;
      nakashichi: string;
      shimogo: string;
      userId: string;
      signupAt: string;
    }
  ];
};

// CSSの記述
const SCButton = styled.button`
  color: palevioletred;
`;
const MUButton = styled(Button)`
  color: palevioletred;
`;

export default function Index() {
  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const getAllResponseData: GetAllResponseData = await response.json();
    return getAllResponseData;
  };

  const { data, error } = useSWR("/api/get-all-senryu", fetcher);
  console.log(data);

  if (error) return <div>全川柳データ取得に失敗</div>;
  if (!data) return <div>loading...</div>;

  if (typeof data === "undefined") {
    return <div>全川柳データ取得に失敗</div>;
  } else {
    const listItems = data.posts.map((post) => (
      <div key={post.postId}>
        {post.kamigo} {post.nakashichi} {post.shimogo}
      </div>
    ));
    return (
      <>
        <SCButton>test</SCButton>
        <MUButton>test-materi</MUButton>
        <h1>SENRYU TOP</h1>
        {listItems}
      </>
    );
  }
}
