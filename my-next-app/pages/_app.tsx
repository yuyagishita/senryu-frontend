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

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const cookies = parseCookies();
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;

  // const Button = styled.div``;

  const headerItems =
    userId === ""
      ? [
          <div key="a">
            <Link href="/login">
              <a>ログイン</a>
            </Link>
          </div>,
          <div key="b">
            <Link href="/register">
              <a>登録する</a>
            </Link>
          </div>,
        ]
      : [
          <div key="a">
            <Link href="/users/:id" as={`/users/${userId}`}>
              <a>マイページ</a>
            </Link>
          </div>,
          <div key="b">
            <Link href="/post">
              <a>投稿する</a>
            </Link>
          </div>,
        ];

  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <CssBaseline />
          <React.Fragment>
            {headerItems}
            <Component {...pageProps} />
          </React.Fragment>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
}

export default App;
