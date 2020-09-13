import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

type PostFormData = {
  userId: string;
  kamigo: string;
  nakashichi: string;
  shimogo: string;
};

type PostResponseData = {
  postId: string;
};

export default function Post() {
  const { register, handleSubmit, watch, errors } = useForm<PostFormData>();
  const onSubmit = useCallback(async (data: PostFormData) => {
    console.log(data);
    const url = "api/post-senryu";
    const cookies = parseCookies();
    const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        kamigo: data.kamigo,
        nakashichi: data.nakashichi,
        shimogo: data.shimogo,
      }),
    });
    const responseData: PostResponseData = await response.json();
    console.log(responseData);
  }, []);

  console.log(watch("kamigo"));
  console.log(watch("nakashichi"));
  console.log(watch("shimogo"));

  return (
    <>
      <h1>SENRYU Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="filed">
          <label className="label">上五</label>
          <input
            name="kamigo"
            placeholder="テストだよ"
            ref={register({ required: true })}
          />
          {errors.kamigo && "上五を入力してください。"}
        </div>
        <div className="filed">
          <label className="label">中七</label>
          <input
            name="nakashichi"
            placeholder="この投稿は"
            ref={register({ required: true })}
          />
          {errors.nakashichi && "中七を入力してください。"}
        </div>
        <div className="filed">
          <label className="label">下五</label>
          <input
            name="shimogo"
            placeholder="テストだよ"
            ref={register({ required: true })}
          />
          {errors.shimogo && "下五を入力してください。"}
        </div>
        <div className="filed">
          <button>投稿する</button>
        </div>
      </form>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userId = typeof cookies.userId === "undefined" ? "" : cookies.userId;
  if (userId === "") {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
  }

  return {
    props: {},
  };
};
