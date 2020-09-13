import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
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

const StyledContainer = styled(Container)`
padding-top: 64px,
padding-bottom: 64px,
`;
const StyledCard = styled(Card)`
height: "100%",
display: "flex",
flex-direction: "column",`;
const StyledCardContent = styled(CardContent)`
  flex-grow: 1;
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
        <main>
          <StyledContainer maxWidth="md">
            <Grid container spacing={4}>
              {listCardItems}
            </Grid>
          </StyledContainer>
        </main>
      </>
    );
  }
}
