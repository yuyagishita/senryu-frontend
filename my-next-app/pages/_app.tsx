import { AppProps } from "next/app";
import Link from "next/link";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import React, { useEffect } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import {
  ThemeProvider as MaterialUIThemeProvider,
  StylesProvider,
} from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";
// import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import BrushIcon from "@material-ui/icons/Brush";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styled from "styled-components";

const StyledBrushIcon = styled(BrushIcon)`
  margin-right: 16px;
`;
const StyledA = styled.a`
  a: link;
`;
const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;
const StyledFooter = styled.footer`
  padding: 48px;
`;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const cookies = parseCookies();
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;

  const headerItems =
    userId === ""
      ? [
          <Link href="/login" key="login">
            <Button color="inherit">ログイン</Button>
          </Link>,
          <Link href="/register" key="register">
            <Button color="inherit">登録する</Button>
          </Link>,
        ]
      : [
          <Link href="/users/:id" as={`/users/${userId}`} key="mypage">
            <Button color="inherit">マイページ</Button>
          </Link>,
          <Link href="/post" key="post">
            <Button color="inherit">投稿する</Button>
          </Link>,
        ];

  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <Link href="/">
                  <StyledA>
                    <StyledBrushIcon />
                  </StyledA>
                </Link>
                <StyledTypography variant="h6" color="inherit" noWrap>
                  SENRYU
                </StyledTypography>
                {headerItems}
              </Toolbar>
            </AppBar>
            <main>
              <Component {...pageProps} />
            </main>
            <StyledFooter>
              <Typography variant="h6" align="center" gutterBottom>
                SENRYU
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                オリジナル川柳をシェアしよう！！
              </Typography>
            </StyledFooter>
          </React.Fragment>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
}

export default App;
