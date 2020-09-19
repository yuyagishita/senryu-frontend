import Router from "next/router";
import { useCallback } from "react";
import fetch from "isomorphic-unfetch";
import { useForm } from "react-hook-form";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

type LoginFormData = {
  username: string;
  password: string;
};
type LoginSuccessData = {
  user: {
    userId: string;
    username: string;
  };
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

export default function Login() {
  const { register, handleSubmit, watch, errors } = useForm<LoginFormData>();
  const onSubmit = useCallback(async (data: LoginFormData) => {
    console.log(data);
    const url = "api/login";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    if (response.status == 200) {
      const loginSuccessData: LoginSuccessData = await response.json();
      console.log(loginSuccessData);
      const cookies = parseCookies();
      console.log({ cookies });
      setCookie(null, "userId", loginSuccessData.user.userId, {
        maxAge: 60,
        path: "/",
      });

      Router.push({
        pathname: "/",
      });
    } else {
      const loginFailureData: LoginFailureData = await response.json();
      console.log(loginFailureData);
      alert(loginFailureData.error);
    }
  }, []);

  console.log(watch("username"));
  console.log(watch("password"));

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <StyledDiv>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <StyledForm noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={register({ required: true })}
              error={errors.username ? true : false}
              helperText={errors.username && "Usernameを入力してください。"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true })}
              error={errors.password ? true : false}
              helperText={errors.password && "Passwordを入力してください。"}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </StyledButton>
          </StyledForm>
        </StyledDiv>
      </Container>
    </>
  );
}
