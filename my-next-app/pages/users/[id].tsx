import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import styled, { keyframes } from "styled-components";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

type GetResponseData = {
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

const StyledCard = styled(Card)`
height: "100%",
display: "flex",
flex-direction: "column",`;
const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
`;
const StyledDiv = styled.div`
  padding-top: 64px;
  padding-bottom: 48px;
`;
const StyeldH1 = styled.h1`
  padding: 0.4em 0.5em; /*文字の上下 左右の余白*/
  color: #494949; /*文字色*/
  background: #f4f4f4; /*背景色*/
  border-left: solid 5px #7db4e6; /*左線*/
  border-bottom: solid 3px #d7d7d7; /*下線*/
`;
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: auto;
  margin-left: auto;
`;

export default function MyPage() {
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const getResponseData: GetResponseData = await response.json();
    return getResponseData;
  };

  const { data, error } = useSWR("/api/get-senryu?id=" + id, fetcher);

  console.log(data);

  console.log(error);

  console.log(id);

  if (!data)
    return (
      <StyledDiv>
        <Container maxWidth="md">
          <StyeldH1>My page</StyeldH1>
          <Spinner />
        </Container>
      </StyledDiv>
    );

  if (typeof data === "undefined" && error) {
    return <div>川柳データ取得に失敗</div>;
  } else {
    const listCardItems = data.posts.map((post) => (
      <Grid item key={post.postId} xs={12} sm={6} md={4}>
        <StyledCard>
          <StyledCardContent>
            <Typography variant="h5" component="h2">
              {post.kamigo}
            </Typography>
            <Typography variant="h5" component="h2">
              {post.nakashichi}
            </Typography>
            <Typography variant="h5" component="h2">
              {post.shimogo}
            </Typography>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    ));

    return (
      <>
        <StyledDiv>
          <Container maxWidth="md">
            <StyeldH1>My page</StyeldH1>
            <Grid container spacing={4}>
              {listCardItems}
            </Grid>
          </Container>
        </StyledDiv>
      </>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;
  if (userId === "") {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return {
    props: {},
  };
};
