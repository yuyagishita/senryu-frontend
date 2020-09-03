import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

type GetAllResponseData = {
  posts: [
    {
      id: string;
      kamigo: string;
      nakashichi: string;
      shimogo: string;
      user_id: string;
      signup_at: string;
    }
  ];
};

export default function Index() {
  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const getAllResponseData: GetAllResponseData = await response.json();
    return getAllResponseData;
  };

  const { data, error } = useSWR("/api/get-all-senryu", fetcher);
  console.log(data);
  console.log(data?.posts[0].kamigo);

  if (error) return <div>全川柳データ取得に失敗</div>;
  if (!data) return <div>loading...</div>;

  if (typeof data === "undefined") {
    return <div>全川柳データ取得に失敗</div>;
  } else {
    const listItems = data.posts.map((post) => (
      <div key={post.id}>
        {post.kamigo} {post.nakashichi} {post.shimogo}
      </div>
    ));
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
          <Link href="/users/:id" as="/users/57a98d98e4b00679b4a830af">
            <a>マイページ</a>
          </Link>
        </div>
        {listItems}
      </>
    );
  }
}
