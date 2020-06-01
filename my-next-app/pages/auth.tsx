import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  console.log(router.query);

  return (
    <>
      <h1>NANPA Auth</h1>
    </>
  );
}
