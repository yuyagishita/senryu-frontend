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
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import BrushIcon from "@material-ui/icons/Brush";

import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Icon = styled(BrushIcon)`
  margin-right: 20px;
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

  const classes = useStyles();

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
            <AppBar position="relative">
              <Toolbar>
                <BrushIcon className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                  SENRYU
                </Typography>
              </Toolbar>
            </AppBar>
            {headerItems}
            <Component {...pageProps} />
          </React.Fragment>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  );
}

export default App;
