import fetch from "isomorphic-unfetch";
import useSWR from "swr";

export default function AllSenryu() {
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json)
      .catch((error) => error);
  const { data, error } = useSWR("/api/get-all", fetcher);
}
