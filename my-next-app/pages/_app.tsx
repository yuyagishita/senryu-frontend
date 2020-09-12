import { AppProps } from "next/app";
import Link from "next/link";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  const cookies = parseCookies();
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;

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
    <React.Fragment>
      {headerItems}
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default App;
