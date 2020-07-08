import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";

type GetAllSuccessData = {
  post: {
    id: string;
    kamigo: string;
    nakashichi: string;
    shimogo: string;
    user_id: string;
    signup_at: string;
  };
};

type GetAllFailureData = {
  error: string;
};

export default function Index() {
  const fetcher = async (url: string) => {
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
    });
    // if (response.status == 200) {
    const getAllSuccessData: GetAllSuccessData = await response.json();
    console.log(getAllSuccessData);
    return response.json();
    // } else {
    //   const getAllFailureData: GetAllFailureData = await response.json();
    //   console.log(getAllFailureData);
    //   return getAllFailureData;
    // }
  };

  const { data, error } = useSWR("/api/get-all-senryu", fetcher);
  console.log(data);
  console.log(error);

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
      <div></div>
    </>
  );
}

// function AllSenryu() {
//   const fetcher = (url: string) =>
//     fetch(url)
//       .then((res) => res.json)
//       .catch((error) => error);
//   const { data, error } = useSWR("/api/getAll", fetcher);
// }

// export async function getServerSideProps() {
//   const url = "http://lacalhost:3000/api/getAll";
//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify({}),
//   });
//   const getAllSuccessData: GetAllSuccessData = await response.json();
//   console.log(getAllSuccessData);

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
