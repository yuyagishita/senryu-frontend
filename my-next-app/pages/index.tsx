import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>NANPA TOP</h1>
      <div>
        <Link href="/login">
          <a>ログイン</a>
        </Link>
      </div>
      <div>
        <Link href="/register">
          <a>登録する</a>
        </Link>
      </div>
    </>
  );
}
