import { destroyCookie } from "nookies";
import { GetServerSideProps } from "next";

export default function Signout() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  destroyCookie(context, "userId");
  context.res.writeHead(302, { Location: "/" });
  context.res.end();

  return {
    props: {},
  };
};
