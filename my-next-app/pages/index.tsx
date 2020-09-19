import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

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
            <StyeldH1>みんなの川柳</StyeldH1>
            <Grid container spacing={4}>
              {listCardItems}
            </Grid>
          </Container>
        </StyledDiv>
      </>
    );
  }
}
