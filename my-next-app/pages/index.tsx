import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>SENRYU TOP</h1>
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
export async function getServerSideProps() {
  const url = "api/getAll";
  const response = await fetch(url);

  return {
    props: {}, // will be passed to the page component as props
  };
}
