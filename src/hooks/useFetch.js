import useSWR from "swr";

import { baseUrl } from "../helpers/request";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useFetch(path, query= {}) {
  const params = new URLSearchParams(query).toString();
  const url = new URL(path, baseUrl).toString();

  const { data, error } = useSWR(`${url}?${params}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
