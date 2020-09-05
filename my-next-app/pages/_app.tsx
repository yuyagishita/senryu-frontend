import { AppProps, Container } from "next/app";
import Link from "next/link";
import { parseCookies, setCookie, destroyCookie } from "nookies";

function App({ Component, pageProps }: AppProps) {
  const cookies = parseCookies();
  console.log({ cookies });
  console.log(cookies.userId);
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
            <Link href="/users/:id" as="/users/57a98d98e4b00679b4a830af">
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
    <Container>
      {headerItems}
      <Component {...pageProps} />
    </Container>
  );
}

export default App;
