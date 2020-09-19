import Router from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

type PostFormData = {
  userId: string;
  kamigo: string;
  nakashichi: string;
  shimogo: string;
};
type PostResponseData = {
  postId: string;
};
type LoginFailureData = {
  error: string;
};

const StyledDiv = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledAvatar = styled(Avatar)`
  margin: 8px;
  background-color: rgb(220, 0, 78);
`;
const StyledForm = styled.form`
  width: 100%;
  margin-top: 8px;
`;
const StyledButton = styled(Button)`
  margin: 24px 0 16px;
`;

export default function Post() {
  const { register, handleSubmit, watch, errors } = useForm<PostFormData>();
  const onSubmit = useCallback(async (data: PostFormData) => {
    console.log(data);
    const url = "api/post-senryu";
    const cookies = parseCookies();
    const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        kamigo: data.kamigo,
        nakashichi: data.nakashichi,
        shimogo: data.shimogo,
      }),
    });
    if (response.status == 200) {
      const responseData: PostResponseData = await response.json();
      console.log(responseData);

      Router.push({
        pathname: "/",
      });
    } else {
      const loginFailureData: LoginFailureData = await response.json();
      console.log(loginFailureData);
      alert(loginFailureData.error);
    }
  }, []);

  console.log(watch("kamigo"));
  console.log(watch("nakashichi"));
  console.log(watch("shimogo"));

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <StyledDiv>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Post
          </Typography>
          <StyledForm noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="kamigo"
              label="上五"
              name="kamigo"
              autoComplete="username"
              autoFocus
              inputRef={register({ required: true })}
              error={errors.kamigo ? true : false}
              helperText={errors.kamigo && "上五を入力してください。"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="nakashichi"
              label="中七"
              name="nakashichi"
              autoComplete="nakashichi"
              autoFocus
              inputRef={register({ required: true })}
              error={errors.nakashichi ? true : false}
              helperText={errors.nakashichi && "中七を入力してください。"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="shimogo"
              label="下五"
              type="shimogo"
              id="shimogo"
              autoComplete="shimogo"
              inputRef={register({ required: true })}
              error={errors.shimogo ? true : false}
              helperText={errors.shimogo && "下五を入力してください。"}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Post
            </StyledButton>
          </StyledForm>
        </StyledDiv>
      </Container>
    </>
  );
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
