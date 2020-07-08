import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

export default function Index() {
  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    return await response.json();
  };

  const { data, error } = useSWR("/api/get-all-senryu", fetcher);
  console.log(data);

  if (error) return <div>全川柳データ取得に失敗</div>;
  if (!data) return <div>loading...</div>;

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
      <div>
        {data.post.kamigo} {data.post.nakashichi} {data.post.shimogo}
      </div>
    </>
  );
}
